import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { ShoppingCart, Search, UserCheck, Truck, Star, Box, Settings, Bell } from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory }) => {
  const { cart, setIsCartOpen, activeUserRole, setActiveUserRole, notifications, orders } = useContext(ShopContext);

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header-container">
      <div className="top-bar">
        <div className="top-bar-content">
          <span>🇨🇴 E-Commerce Tecnológico Oficial - Ciber Shop Colombia (SENA ADSO)</span>
          <div className="role-switcher">
            <span className="role-label">Rol Actual:</span>
            <button 
              className={`role-btn ${activeUserRole === 'cliente' ? 'active-role' : ''}`}
              onClick={() => setActiveUserRole('cliente')}
            >
              <UserCheck size={14} /> Cliente
            </button>
            <button 
              className={`role-btn ${activeUserRole === 'admin' ? 'active-role-admin' : ''}`}
              onClick={() => setActiveUserRole('admin')}
            >
              <Settings size={14} /> Administrador
            </button>
          </div>
        </div>
      </div>

      <div className="main-navbar">
        <div className="brand-logo" onClick={() => setActiveTab('catalog')}>
          <div className="logo-icon">CS</div>
          <div>
            <h1 className="logo-title">CIBER SHOP</h1>
            <p className="logo-subtitle">Colombia • HW, SW & Servicios</p>
          </div>
        </div>

        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Buscar servidores, licencias, mantenimiento..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="nav-actions">
          <button 
            className={`nav-btn ${activeTab === 'tracker' ? 'active-btn' : ''}`}
            onClick={() => setActiveTab('tracker')}
            title="Rastreo GPS de Envíos"
          >
            <Truck size={20} />
            <span className="btn-label">Rastreo GPS</span>
            {orders.length > 0 && <span className="pulse-dot"></span>}
          </button>

          <button 
            className={`nav-btn ${activeTab === 'reviews' ? 'active-btn' : ''}`}
            onClick={() => setActiveTab('reviews')}
            title="Reseñas y Reputación"
          >
            <Star size={20} />
            <span className="btn-label">Reputación</span>
          </button>

          {activeUserRole === 'admin' && (
            <button 
              className={`nav-btn admin-highlight ${activeTab === 'admin' ? 'active-btn' : ''}`}
              onClick={() => setActiveTab('admin')}
              title="Panel de Gestión de Inventario"
            >
              <Box size={20} />
              <span className="btn-label">Admin Panel</span>
            </button>
          )}

          <button 
            className="cart-btn"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart size={22} />
            <span className="cart-badge">{cartItemsCount}</span>
          </button>
        </div>
      </div>

      <nav className="categories-bar">
        <button 
          className={`category-pill ${selectedCategory === 'Todos' ? 'active-pill' : ''}`}
          onClick={() => setSelectedCategory('Todos')}
        >
          Todos los Productos
        </button>
        <button 
          className={`category-pill ${selectedCategory === 'Hardware' ? 'active-pill' : ''}`}
          onClick={() => setSelectedCategory('Hardware')}
        >
          🖥️ Hardware & Servidores
        </button>
        <button 
          className={`category-pill ${selectedCategory === 'Software' ? 'active-pill' : ''}`}
          onClick={() => setSelectedCategory('Software')}
        >
          💿 Software & Licencias
        </button>
        <button 
          className={`category-pill ${selectedCategory === 'Servicio' ? 'active-pill' : ''}`}
          onClick={() => setSelectedCategory('Servicio')}
        >
          🔧 Servicios Técnicos SENA
        </button>
      </nav>

      {notifications.length > 0 && (
        <div className={`notification-toast toast-${notifications[0].type}`}>
          <Bell size={16} />
          <span>{notifications[0].message}</span>
          <span className="toast-time">{notifications[0].time}</span>
        </div>
      )}
    </header>
  );
};
