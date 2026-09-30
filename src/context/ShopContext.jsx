import React, { createContext, useState } from 'react';
import { initialProducts, initialReviews } from '../data/products';

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);
  const [reviews, setReviews] = useState(initialReviews);
  const [cart, setCart] = useState([]);
  const [activeUserRole, setActiveUserRole] = useState('cliente');
  const [orders, setOrders] = useState([
    {
      id: "ORD-2026-8891",
      date: "2026-05-24 10:30 AM",
      customerName: "Carlos Mantilla",
      address: "Calle 26 # 68D-35, Bogotá D.C.",
      paymentMethod: "Nequi",
      total: 19700000,
      status: "En Ruta",
      trackingCode: "TRK-BOG-9921",
      gpsCoords: { lat: 4.6533, lng: -74.0836 },
      items: [
        { id: "HW-001", name: "Servidor Empresarial Dell PowerEdge R750", price: 18500000, quantity: 1, category: "Hardware" },
        { id: "ADD-004", name: "Configuración de Red VLAN y Políticas de Seguridad", price: 1200000, quantity: 1, category: "Servicio" }
      ]
    }
  ]);
  const [activeOrderForTracking, setActiveOrderForTracking] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "¡Bienvenido a Ciber Shop Colombia! Explora nuestro catálogo multiformato.", time: "Ahora", type: "info" }
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProductDetails, setSelectedProductDetails] = useState(null);

  const addToCart = (product, selectedAddon = null) => {
    const currentProduct = products.find(p => p.id === product.id);
    if (currentProduct && currentProduct.stock <= 0 && currentProduct.category !== "Software") {
      addNotification(`El producto "${product.name}" está agotado en inventario.`, "danger");
      return;
    }

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.id === product.id);
      let newCart = [...prevCart];
      if (existingIndex >= 0) {
        newCart[existingIndex].quantity += 1;
      } else {
        newCart.push({ ...product, quantity: 1, selectedAddons: selectedAddon ? [selectedAddon] : [] });
      }
      return newCart;
    });

    addNotification(`Se agregó "${product.name}" al carrito de compras.`, "success");
  };

  const addAddonToCartItem = (productId, addon) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === productId) {
          const hasAddon = item.selectedAddons?.some(a => a.id === addon.id);
          if (hasAddon) return item;
          return {
            ...item,
            selectedAddons: [...(item.selectedAddons || []), addon]
          };
        }
        return item;
      });
    });
    addNotification(`Add-on "${addon.name}" añadido al producto.`, "info");
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    addNotification("Producto eliminado del carrito.", "info");
  };

  const updateCartQuantity = (productId, delta) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === productId) {
          const newQty = item.quantity + delta;
          if (newQty <= 0) return null;
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(Boolean);
    });
  };

  const clearCart = () => setCart([]);

  const processCheckout = (customerData, paymentMethod) => {
    const totalAmount = cart.reduce((sum, item) => {
      const addonsSum = (item.selectedAddons || []).reduce((aSum, a) => aSum + a.price, 0);
      return sum + (item.price + addonsSum) * item.quantity;
    }, 0);

    const newOrder = {
      id: `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleString('es-CO'),
      customerName: customerData.name,
      address: customerData.address || "Dirección Principal Bogotá",
      phone: customerData.phone,
      paymentMethod: paymentMethod,
      total: totalAmount,
      status: "Procesado",
      trackingCode: `TRK-BOG-${Math.floor(1000 + Math.random() * 9000)}`,
      gpsCoords: { lat: 4.6097, lng: -74.0817 },
      items: [...cart]
    };

    setProducts(prevProducts => {
      return prevProducts.map(p => {
        const cartItem = cart.find(ci => ci.id === p.id);
        if (cartItem && p.category !== "Software") {
          return { ...p, stock: Math.max(0, p.stock - cartItem.quantity) };
        }
        return p;
      });
    });

    setOrders(prev => [newOrder, ...prev]);
    setActiveOrderForTracking(newOrder);
    clearCart();
    setIsCheckoutOpen(false);
    setIsCartOpen(false);

    addNotification(`¡Orden ${newOrder.id} generada con éxito! Factura emitida.`, "success");
    return newOrder;
  };

  const addNotification = (message, type = "info") => {
    const newNotif = {
      id: Date.now(),
      message,
      time: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
      type
    };
    setNotifications(prev => [newNotif, ...prev.slice(0, 4)]);
  };

  const addProduct = (newProduct) => {
    setProducts(prev => [newProduct, ...prev]);
    addNotification(`Nuevo producto "${newProduct.name}" registrado en el inventario.`, "success");
  };

  const updateProductStock = (id, newStock) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, stock: parseInt(newStock) || 0 } : p));
    addNotification(`Stock actualizado para ID ${id}.`, "info");
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    addNotification(`Producto ${id} eliminado del catálogo.`, "danger");
  };

  const addReview = (reviewData) => {
    const newRev = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      verifiedBuyer: true,
      ...reviewData
    };
    setReviews(prev => [newRev, ...prev]);
    addNotification("Reseña publicada. ¡Gracias por tu opinión!", "success");
  };

  return (
    <ShopContext.Provider value={{
      products,
      reviews,
      cart,
      activeUserRole,
      setActiveUserRole,
      orders,
      activeOrderForTracking,
      setActiveOrderForTracking,
      notifications,
      isCartOpen,
      setIsCartOpen,
      isCheckoutOpen,
      setIsCheckoutOpen,
      selectedProductDetails,
      setSelectedProductDetails,
      addToCart,
      addAddonToCartItem,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      processCheckout,
      addProduct,
      updateProductStock,
      deleteProduct,
      addReview,
      addNotification
    }}>
      {children}
    </ShopContext.Provider>
  );
};
