import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { ShieldCheck, MessageSquare } from 'lucide-react';

export const ReviewsPanel = () => {
  const { reviews, products, addReview } = useContext(ShopContext);

  const [selectedProduct, setSelectedProduct] = useState(products[0]?.id || '');
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!author || !comment) return;

    addReview({
      productId: selectedProduct,
      author,
      rating: parseInt(rating),
      comment
    });

    setAuthor('');
    setComment('');
  };

  return (
    <div className="reviews-container">
      <div className="reviews-header">
        <h2>⭐ Panel de Reseñas y Reputación de Usuarios (RF09)</h2>
        <p>Valoraciones y comentarios moderados de compradores verificados en la plataforma CiberShop.</p>
      </div>

      <div className="reviews-layout">
        <div className="review-form-card">
          <h3><MessageSquare size={18} /> Publicar Calificación (Comprador Verificado)</h3>
          <form onSubmit={handleReviewSubmit} className="review-form">
            <div className="form-group">
              <label>Selecciona el Producto Adquirido:</label>
              <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
                {products.map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.category})</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Tu Nombre / Entidad:</label>
              <input 
                type="text" 
                value={author} 
                onChange={(e) => setAuthor(e.target.value)} 
                placeholder="Ej. Ing. Diana Martínez"
                required 
              />
            </div>

            <div className="form-group">
              <label>Calificación (Estrellas):</label>
              <select value={rating} onChange={(e) => setRating(e.target.value)}>
                <option value={5}>⭐⭐⭐⭐⭐ (5/5) - Excelente</option>
                <option value={4}>⭐⭐⭐⭐ (4/5) - Muy Bueno</option>
                <option value={3}>⭐⭐⭐ (3/5) - Aceptable</option>
                <option value={2}>⭐⭐ (2/5) - Regular</option>
                <option value={1}>⭐ (1/5) - Insatisfecho</option>
              </select>
            </div>

            <div className="form-group">
              <label>Comentario y Experiencia de Uso:</label>
              <textarea 
                rows="3" 
                value={comment} 
                onChange={(e) => setComment(e.target.value)} 
                placeholder="Describe la calidad del hardware, instalación o atención técnica..."
                required 
              ></textarea>
            </div>

            <button type="submit" className="btn-submit-review">
              Publicar Reseña Verificada
            </button>
          </form>
        </div>

        <div className="reviews-stream-card">
          <h3><ShieldCheck size={18} /> Reseñas Recientes en la Plataforma</h3>
          <div className="reviews-list">
            {reviews.map(r => {
              const prod = products.find(p => p.id === r.productId);
              return (
                <div key={r.id} className="stream-review-item">
                  <div className="stream-review-header">
                    <div>
                      <strong>{r.author}</strong>
                      {prod && <div className="prod-ref">Sobre: {prod.name}</div>}
                    </div>
                    <span className="star-rating-badge">{'★'.repeat(r.rating)}</span>
                  </div>
                  <p className="comment-text">"{r.comment}"</p>
                  <div className="review-meta">
                    <span>{r.date}</span>
                    <span className="verified-badge"><ShieldCheck size={12} /> Comprador Verificado SENA</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
