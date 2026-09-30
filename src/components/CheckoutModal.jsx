import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { X, CreditCard, Wallet, Smartphone, CheckCircle, FileText } from 'lucide-react';

export const CheckoutModal = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, processCheckout, setActiveTab } = useContext(ShopContext);

  const [customerName, setCustomerName] = useState('Carlos Andrés Mantilla');
  const [customerDoc, setCustomerDoc] = useState('1016487199');
  const [address, setAddress] = useState('Calle 26 # 68D-35, Ciudad Salitre');
  const [phone, setPhone] = useState('310 987 6543');
  const [paymentMethod, setPaymentMethod] = useState('Nequi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  if (!isCheckoutOpen) return null;

  const formatCOP = (amount) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(amount);
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => {
      const addonsSum = (item.selectedAddons || []).reduce((aSum, a) => aSum + a.price, 0);
      return sum + (item.price + addonsSum) * item.quantity;
    }, 0);
  };

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const order = processCheckout(
        { name: customerName, address, phone, doc: customerDoc },
        paymentMethod
      );
      setCompletedOrder(order);
      setIsProcessing(false);
    }, 1800);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content modal-medium">
        <button className="close-btn" onClick={() => setIsCheckoutOpen(false)}>
          <X size={20} />
        </button>

        {!completedOrder ? (
          <div>
            <h2>💳 Pasarela de Pagos CiberShop (RF11)</h2>
            <p className="checkout-subtitle">Ingresa tus datos para la factura y selecciona tu método de pago preferido.</p>

            <form onSubmit={handlePay} className="checkout-form">
              <div className="form-group">
                <label>Nombre Completo / Razón Social:</label>
                <input 
                  type="text" 
                  value={customerName} 
                  onChange={(e) => setCustomerName(e.target.value)} 
                  required 
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Cédula / NIT:</label>
                  <input 
                    type="text" 
                    value={customerDoc} 
                    onChange={(e) => setCustomerDoc(e.target.value)} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Teléfono de Contacto:</label>
                  <input 
                    type="text" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Dirección de Entrega (Colombia):</label>
                <input 
                  type="text" 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)} 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Método de Pago Integrado:</label>
                <div className="payment-options-grid">
                  <label className={`payment-option ${paymentMethod === 'Nequi' ? 'selected-payment' : ''}`}>
                    <input 
                      type="radio" 
                      name="payment" 
                      value="Nequi" 
                      checked={paymentMethod === 'Nequi'}
                      onChange={() => setPaymentMethod('Nequi')}
                    />
                    <Smartphone size={20} /> Nequi
                  </label>

                  <label className={`payment-option ${paymentMethod === 'Daviplata' ? 'selected-payment' : ''}`}>
                    <input 
                      type="radio" 
                      name="payment" 
                      value="Daviplata" 
                      checked={paymentMethod === 'Daviplata'}
                      onChange={() => setPaymentMethod('Daviplata')}
                    />
                    <Wallet size={20} /> Daviplata
                  </label>

                  <label className={`payment-option ${paymentMethod === 'Tarjeta' ? 'selected-payment' : ''}`}>
                    <input 
                      type="radio" 
                      name="payment" 
                      value="Tarjeta" 
                      checked={paymentMethod === 'Tarjeta'}
                      onChange={() => setPaymentMethod('Tarjeta')}
                    />
                    <CreditCard size={20} /> Tarjeta Débito / Crédito
                  </label>
                </div>
              </div>

              <div className="checkout-summary-box">
                <div className="summary-line">
                  <span>Total a debitar:</span>
                  <strong className="amount">{formatCOP(calculateTotal())}</strong>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn-pay-now"
                disabled={isProcessing}
              >
                {isProcessing ? "Procesando Transacción Cifrada..." : `Confirmar y Pagar ${formatCOP(calculateTotal())}`}
              </button>
            </form>
          </div>
        ) : (
          <div className="invoice-success-screen">
            <div className="success-header">
              <CheckCircle size={48} className="success-icon" />
              <h2>¡Pago Aprobado y Orden Generada!</h2>
              <p>Factura electrónica enviada a tu correo institucional.</p>
            </div>

            <div className="invoice-receipt-card">
              <div className="receipt-header">
                <FileText size={20} />
                <span>Factura Electrónica #{completedOrder.id}</span>
              </div>
              <div className="receipt-body">
                <p><strong>Cliente:</strong> {completedOrder.customerName}</p>
                <p><strong>Fecha:</strong> {completedOrder.date}</p>
                <p><strong>Método de Pago:</strong> {completedOrder.paymentMethod}</p>
                <p><strong>Código de Rastreo GPS:</strong> {completedOrder.trackingCode}</p>

                <hr />
                <h4>Artículos Adquiridos:</h4>
                <ul>
                  {completedOrder.items.map((it, idx) => (
                    <li key={idx}>
                      {it.quantity}x {it.name} - {formatCOP(it.price * it.quantity)}
                    </li>
                  ))}
                </ul>
                <div className="receipt-total">
                  <span>Total Pagado:</span>
                  <strong>{formatCOP(completedOrder.total)}</strong>
                </div>
              </div>
            </div>

            <div className="invoice-actions">
              <button 
                className="btn-primary-lg"
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setActiveTab('tracker');
                }}
              >
                Rastrear Envío en Tiempo Real (GPS)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
