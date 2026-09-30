import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Box, PlusCircle, Trash2 } from 'lucide-react';

export const AdminInventory = () => {
  const { products, addProduct, updateProductStock, deleteProduct } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('Hardware');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('10');
  const [description, setDescription] = useState('');

  const formatCOP = (amount) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(amount);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!name || !price) return;

    const newProd = {
      id: `${category.substring(0,2).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      name,
      category,
      price: parseFloat(price),
      stock: parseInt(stock),
      rating: 5.0,
      reviewsCount: 0,
      image: category === 'Hardware' 
        ? "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=500&auto=format&fit=crop"
        : category === 'Software'
        ? "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop"
        : "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop",
      description: description || "Producto tecnológico administrado desde el sistema central CiberShop.",
      attributes: {
        type: category,
        registeredBy: "Administrador CiberShop",
        dateAdded: new Date().toISOString().split('T')[0]
      },
      recommendedAddons: []
    };

    addProduct(newProd);
    setName('');
    setPrice('');
    setDescription('');
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div>
          <h2>🛠️ Panel de Gestión de Inventario y Administración (RF01 / RF03 / RF04)</h2>
          <p>Control centralizado de productos multiformato (Hardware, Software y Servicios) y verificación de existencias.</p>
        </div>
      </div>

      <div className="admin-grid">
        <div className="admin-card">
          <h3><PlusCircle size={18} /> Registrar Nuevo Producto / Servicio (RF03)</h3>
          <form onSubmit={handleAddProduct} className="admin-form">
            <div className="form-group">
              <label>Nombre del Producto / Servicio:</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Ej. Servidor NAS QNAP 4 Bahías"
                required 
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Categoría Multiformato:</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="Hardware">Hardware (Físico)</option>
                  <option value="Software">Software (Licencia)</option>
                  <option value="Servicio">Servicio Técnico</option>
                </select>
              </div>

              <div className="form-group">
                <label>Precio (COP $):</label>
                <input 
                  type="number" 
                  value={price} 
                  onChange={(e) => setPrice(e.target.value)} 
                  placeholder="Ej. 2500000"
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label>Stock Inicial (Unidades):</label>
              <input 
                type="number" 
                value={stock} 
                onChange={(e) => setStock(e.target.value)} 
                required 
              />
            </div>

            <div className="form-group">
              <label>Descripción Técnica:</label>
              <textarea 
                rows="3" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Ingresa especificaciones clave..."
              ></textarea>
            </div>

            <button type="submit" className="btn-admin-submit">
              Guardar en Base de Datos
            </button>
          </form>
        </div>

        <div className="admin-card">
          <h3><Box size={18} /> Control de Existencias en Tiempo Real (RF05)</h3>
          <p className="subtext">Modifica las cantidades en stock directamente para sincronizar el catálogo comercial.</p>

          <div className="inventory-table-wrapper">
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Producto</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id}>
                    <td><code>{p.id}</code></td>
                    <td className="product-col-name">{p.name}</td>
                    <td><span className={`cat-badge cat-${p.category.toLowerCase()}`}>{p.category}</span></td>
                    <td>{formatCOP(p.price)}</td>
                    <td>
                      <input 
                        type="number" 
                        value={p.stock} 
                        onChange={(e) => updateProductStock(p.id, e.target.value)}
                        className="stock-inline-input"
                      />
                    </td>
                    <td>
                      <button 
                        className="btn-admin-delete"
                        onClick={() => deleteProduct(p.id)}
                        title="Eliminar producto"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
