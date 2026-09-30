import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Truck, MapPin, CheckCircle2, Clock, ShieldCheck, Thermometer, Radio, Package } from 'lucide-react';

export const OrderTracker = () => {
  const { orders, activeOrderForTracking, setActiveOrderForTracking } = useContext(ShopContext);

  const currentOrder = activeOrderForTracking || (orders.length > 0 ? orders[0] : null);

  const [simulatedLat, setSimulatedLat] = useState(4.6533);
  const [simulatedLng, setSimulatedLng] = useState(-74.0836);
  const [sensorTemp, setSensorTemp] = useState(21.5);

  useEffect(() => {
    if (!currentOrder) return;
    const interval = setInterval(() => {
      setSimulatedLat(prev => prev + (Math.random() - 0.5) * 0.002);
      setSimulatedLng(prev => prev + (Math.random() - 0.5) * 0.002);
      setSensorTemp(prev => parseFloat((21.0 + Math.random() * 1.2).toFixed(1)));
    }, 3000);

    return () => clearInterval(interval);
  }, [currentOrder]);

  const formatCOP = (amount) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(amount);
  };

  if (!currentOrder) {
    return (
      <div className="tracker-container empty-tracker">
        <Truck size={48} className="empty-icon" />
        <h2>No tienes órdenes activas para rastrear</h2>
        <p>Realiza una compra en la tienda para hacerle seguimiento en tiempo real vía GPS.</p>
      </div>
    );
  }

  const steps = [
    { title: "1. Orden Confirmada", desc: "Pago verificado y factura emitida", done: true },
    { title: "2. Inventario y Empaque", desc: "Seriales y licencias asociadas", done: true },
    { title: "3. En Ruta de Entrega GPS", desc: "Transporte logístico CiberShop en camino", done: currentOrder.status === 'En Ruta' || currentOrder.status === 'Entregado' },
    { title: "4. Entrega Confirmada", desc: "Firma y recepción por el cliente", done: currentOrder.status === 'Entregado' }
  ];

  return (
    <div className="tracker-container">
      <div className="tracker-header">
        <div>
          <h2>📡 Rastreo de Envíos en Tiempo Real (RF13 / RF12)</h2>
          <p>Código de Seguimiento: <strong>{currentOrder.trackingCode}</strong> • Orden #{currentOrder.id}</p>
        </div>

        {orders.length > 1 && (
          <select 
            className="order-select-dropdown"
            value={currentOrder.id}
            onChange={(e) => {
              const selected = orders.find(o => o.id === e.target.value);
              setActiveOrderForTracking(selected);
            }}
          >
            {orders.map(o => (
              <option key={o.id} value={o.id}>
                {o.id} - {o.customerName} ({o.status})
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="stepper-card">
        <h3>Estado del Pedido: <span className="status-highlight">{currentOrder.status}</span></h3>
        <div className="stepper-grid">
          {steps.map((step, idx) => (
            <div key={idx} className={`step-item ${step.done ? 'step-done' : ''}`}>
              <div className="step-icon-circle">
                {step.done ? <CheckCircle2 size={18} /> : <Clock size={18} />}
              </div>
              <div className="step-text">
                <strong>{step.title}</strong>
                <span>{step.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="map-sensor-grid">
        <div className="simulated-map-card">
          <div className="map-header">
            <MapPin size={18} className="ping-icon" />
            <span>Mapa de Geolocalización GPS Bogotá D.C.</span>
            <span className="live-badge"><Radio size={12} /> EN VIVO</span>
          </div>

          <div className="map-canvas">
            <div className="map-grid-lines"></div>
            <div className="vehicle-marker" style={{ top: '45%', left: '52%' }}>
              <Truck size={24} className="truck-icon" />
              <div className="radar-pulse"></div>
              <div className="marker-label">Vehículo CiberShop - Salitre</div>
            </div>

            <div className="destination-marker" style={{ top: '30%', left: '75%' }}>
              <Package size={20} />
              <span className="dest-label">Destino: {currentOrder.address}</span>
            </div>
          </div>

          <div className="gps-coordinates-bar">
            <span>Coordenadas GPS: <code>{simulatedLat.toFixed(4)}° N, {simulatedLng.toFixed(4)}° W</code></span>
            <span>Velocidad Estimada: <strong>28 km/h</strong></span>
          </div>
        </div>

        <div className="telemetry-card">
          <h3>📊 Sensores de Calidad (RF13)</h3>
          <p className="sensor-subtitle">Monitoreo IoT en tiempo real de la mercancía durante el transporte.</p>

          <div className="sensor-metric">
            <div className="metric-header">
              <Thermometer size={18} />
              <span>Temperatura de Carga:</span>
            </div>
            <strong className="metric-value">{sensorTemp} °C (Óptima)</strong>
          </div>

          <div className="sensor-metric">
            <div className="metric-header">
              <ShieldCheck size={18} />
              <span>Sensor de Impacto / Caídas:</span>
            </div>
            <strong className="metric-value status-ok">Sin Incidentes ✅</strong>
          </div>

          <div className="order-details-mini">
            <h4>Detalles de Entrega</h4>
            <p><strong>Destinatario:</strong> {currentOrder.customerName}</p>
            <p><strong>Dirección:</strong> {currentOrder.address}</p>
            <p><strong>Método Pago:</strong> {currentOrder.paymentMethod}</p>
            <p><strong>Total Facturado:</strong> {formatCOP(currentOrder.total)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
