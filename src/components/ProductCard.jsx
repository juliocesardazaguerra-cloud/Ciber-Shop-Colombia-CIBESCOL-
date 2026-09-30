import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { ShoppingCart, Eye, Star, CheckCircle, AlertTriangle } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { addToCart, setSelectedProductDetails } = useContext(ShopContext);

  const formatCOP = (amount) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(amount);
  };

  const isOutOfStock = product.stock <= 0 && product.category !== 'Software';

  return (
    <div className="product-card">
      <div className="card-image-wrapper">
        <img src={product.image} alt={product.name} className="product-image" />
        <span className={`category-tag tag-${product.category.toLowerCase()}`}>
          {product.category}
        </span>
        {isOutOfStock ? (
          <span className="stock-badge badge-out">
            <AlertTriangle size={12} /> Sin Stock
          </span>
        ) : (
          <span className="stock-badge badge-in">
            <CheckCircle size={12} /> {product.category === 'Software' ? 'Disponible Cloud' : `${product.stock} Disponibles`}
          </span>
        )}
      </div>

      <div className="card-body">
        <div className="rating-row">
          <Star size={14} className="star-icon" />
          <span className="rating-val">{product.rating}</span>
          <span className="reviews-count">({product.reviewsCount} opiniones)</span>
        </div>

        <h3 className="product-title" title={product.name}>{product.name}</h3>
        <p className="product-desc">{product.description}</p>

        <div className="product-footer">
          <div className="price-container">
            <span className="price-label">Precio Final:</span>
            <span className="price-value">{formatCOP(product.price)}</span>
          </div>

          <div className="card-actions">
            <button 
              className="btn-icon" 
              onClick={() => setSelectedProductDetails(product)}
              title="Ver Atributos Dinámicos y Especificaciones"
            >
              <Eye size={18} />
            </button>
            <button 
              className="btn-add-cart"
              onClick={() => addToCart(product)}
              disabled={isOutOfStock}
            >
              <ShoppingCart size={16} /> Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
