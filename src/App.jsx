import React, { useState, useContext } from 'react';
import { ShopContext } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTracker } from './components/OrderTracker';
import { AdminInventory } from './components/AdminInventory';
import { ReviewsPanel } from './components/ReviewsPanel';
import { Footer } from './components/Footer';

export const AppContent = () => {
  const { products } = useContext(ShopContext);

  const [activeTab, setActiveTab] = useState('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="app-container">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <main className="main-content-container">
        {activeTab === 'catalog' && (
          <section className="catalog-section">
            <div className="catalog-hero">
              <div className="hero-text">
                <h2>Soluciones Tecnológicas Integrales en Colombia</h2>
                <p>Comercialización de Servidores, Laptops, Licencias Cloud y Servicios Técnicos con Garantía SENA.</p>
              </div>
            </div>

            <div className="catalog-grid-header">
              <h3>Catálogo de Productos ({filteredProducts.length})</h3>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="no-results">
                <p>No se encontraron productos para "{searchQuery}". Intenta con otros términos.</p>
              </div>
            ) : (
              <div className="products-grid">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === 'tracker' && <OrderTracker />}
        {activeTab === 'admin' && <AdminInventory />}
        {activeTab === 'reviews' && <ReviewsPanel />}
      </main>

      <ProductDetailsModal />
      <CartDrawer />
      <CheckoutModal />
      <Footer />
    </div>
  );
};
