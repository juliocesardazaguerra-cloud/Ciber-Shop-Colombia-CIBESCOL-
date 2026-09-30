import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { X, Layers, Wrench, PlusCircle } from 'lucide-react';

export const ProductDetailsModal = () => {
  const { selectedProductDetails, setSelectedProductDetails, addToCart, reviews } = useContext(ShopContext);

  if (!selectedProductDetails) return null;

  const product = selectedProductDetails;

  const formatCOP = (amount) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(amount);
  };

  const productReviews = reviews.filter(r => r.productId === product.id);

  return (
    <div className="modal-overlay">
      <div className="modal-content modal-large">
        <button className="close-btn" onClick={() => setSelectedProductDetails(null)}>
          <X size={20} />
        </button>

        <div className="details-grid">
          <div className="details-image-col">
            <img src={product.image} alt={product.name} className="details-img" />
            <div className="category-pill-lg">{product.category}</div>
          </div>

          <div className="details-info-col">
            <h2>{product.name}</h2>
            <p className="details-desc">{product.description}</p>

            <div className="price-tag-lg">
              {formatCOP(product.price)}
              <span className="price-tax"> (IVA Incluido)</span>
            </div>

            <div className="dynamic-attributes-box">
              <h4><Layers size={16} /> Atributos Dinámicos (RF16)</h4>
              <ul className="attr-list">
                {Object.entries(product.attributes || {}).map(([key, val]) => (
                  <li key={key}>
                    <strong className="attr-key">{key}:</strong> 
                    <span className="attr-val">{typeof val === 'boolean' ? (val ? 'Sí' : 'No') : val}</span>
                  </li>
                ))}
              </ul>
            </div>

            {product.recommendedAddons && product.recommendedAddons.length > 0 && (
              <div className="addons-suggestion-box">
                <h4><Wrench size={16} /> Servicios & Add-ons Recomendados (RF08)</h4>
                <div className="addons-list">
                  {product.recommendedAddons.map(addon => (
                    <div key={addon.id} className="addon-item">
                      <div>
                        <strong>{addon.name}</strong>
                        <div className="addon-price">+{formatCOP(addon.price)}</div>
                      </div>
                      <button 
                        className="btn-addon-add"
                        onClick={() => {
                          addToCart(product, addon);
                          setSelectedProductDetails(null);
                        }}
                      >
                        <PlusCircle size={14} /> Incluir
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="modal-actions-bar">
              <button 
                className="btn-primary-lg"
                onClick={() => {
                  addToCart(product);
                  setSelectedProductDetails(null);
                }}
              >
                Agregar al Carrito de Compras
              </button>
            </div>
          </div>
        </div>

        <div className="modal-reviews-section">
          <h3>Opiniones de Compradores Verificados</h3>
          {productReviews.length === 0 ? (
            <p className="no-reviews">Sé el primero en dejar una reseña para este producto.</p>
          ) : (
            <div className="reviews-grid">
              {productReviews.map(r => (
                <div key={r.id} className="review-card">
                  <div className="review-header">
                    <strong>{r.author}</strong>
                    <span className="stars">{'★'.repeat(r.rating)}</span>
                  </div>
                  <p className="review-comment">"{r.comment}"</p>
                  <span className="review-date">{r.date} • Comprador Verificado ✅</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
