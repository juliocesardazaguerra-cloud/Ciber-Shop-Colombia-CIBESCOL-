import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { X, Trash2, Plus, Minus, ArrowRight, Lightbulb, ShieldCheck } from 'lucide-react';

export const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateCartQuantity, setIsCheckoutOpen, addAddonToCartItem } = useContext(ShopContext);

  if (!isCartOpen) return null;

  const formatCOP = (amount) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(amount);
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => {
      const addonsSum = (item.selectedAddons || []).reduce((aSum, a) => aSum + a.price, 0);
      return sum + (item.price + addonsSum) * item.quantity;
    }, 0);
  };

  const total = calculateSubtotal();

  return (
    <div className="drawer-overlay">
      <div className="drawer-container">
        <div className="drawer-header">
          <h2>🛒 Mi Carrito de Compras ({cart.length})</h2>
          <button className="close-btn" onClick={() => setIsCartOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="drawer-body">
          {cart.length === 0 ? (
            <div className="empty-cart-view">
              <p>Tu carrito está vacío.</p>
              <span className="empty-sub">Explora nuestro catálogo para añadir Hardware, Licencias o Servicios.</span>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map(item => {
                const addonsPrice = (item.selectedAddons || []).reduce((s, a) => s + a.price, 0);
                const itemTotal = (item.price + addonsPrice) * item.quantity;

                return (
                  <div key={item.id} className="cart-item-card">
                    <div className="cart-item-main">
                      <img src={item.image} alt={item.name} className="cart-item-img" />
                      <div className="cart-item-info">
                        <h4>{item.name}</h4>
                        <span className="item-unit-price">{formatCOP(item.price)} c/u</span>

                        {item.selectedAddons && item.selectedAddons.length > 0 && (
                          <div className="item-addons-list">
                            <small className="addons-title">Incluye servicios:</small>
                            {item.selectedAddons.map(addon => (
                              <div key={addon.id} className="addon-chip">
                                🔧 {addon.name} (+{formatCOP(addon.price)})
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <button 
                        className="btn-delete" 
                        onClick={() => removeFromCart(item.id)}
                        title="Eliminar producto"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="cart-item-footer">
                      <div className="quantity-controls">
                        <button onClick={() => updateCartQuantity(item.id, -1)}><Minus size={14} /></button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateCartQuantity(item.id, 1)}><Plus size={14} /></button>
                      </div>
                      <div className="item-subtotal">{formatCOP(itemTotal)}</div>
                    </div>

                    {item.recommendedAddons && item.recommendedAddons.length > 0 && (
                      <div className="cross-selling-box">
                        <div className="cross-title">
                          <Lightbulb size={14} className="lightbulb-icon" /> 
                          <span>Sugerencia Cross-selling CiberShop (RF08)</span>
                        </div>
                        {item.recommendedAddons.map(addon => (
                          <div key={addon.id} className="cross-item-row">
                            <span>{addon.name} ({formatCOP(addon.price)})</span>
                            <button 
                              className="btn-add-addon-sm"
                              onClick={() => addAddonToCartItem(item.id, addon)}
                            >
                              + Añadir
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="drawer-footer">
            <div className="summary-row">
              <span>Subtotal:</span>
              <strong>{formatCOP(total)}</strong>
            </div>
            <div className="summary-row">
              <span>Envío / Despliegue:</span>
              <strong className="free-shipping">GRATIS 🇨🇴</strong>
            </div>
            <div className="summary-row total-row">
              <span>Total a Pagar:</span>
              <span className="total-val">{formatCOP(total)}</span>
            </div>

            <button 
              className="btn-checkout-primary"
              onClick={() => setIsCheckoutOpen(true)}
            >
              Proceder al Pago Seguro <ArrowRight size={18} />
            </button>
            <p className="guarantee-note">
              <ShieldCheck size={14} /> Transacción cifrada con protocolo SSL y soporte SENA.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
