import React from 'react';
import { Award, Leaf, FileCode } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-col">
          <h3>CIBER SHOP COLOMBIA</h3>
          <p>E-Commerce integral de comercio bidireccional en Hardware, Software y Servicios Técnicos Especializados.</p>
          <div className="sena-badge">
            <Award size={16} /> Tecnólogo en Análisis y Desarrollo de Software SENA (ADSO 3387641)
          </div>
        </div>

        <div className="footer-col">
          <h4>Integrantes del Equipo</h4>
          <ul>
            <li>Carlos Andrés Mantilla Hernández</li>
            <li>Juan Sebastián Cepeda Castro</li>
            <li>Julio César Daza Guerra</li>
            <li className="instructor-tag">Instructor: Gloria Clemencia Casais</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Compromiso Ecosistémico</h4>
          <p><Leaf size={14} className="leaf-icon" /> Modelo de economía circular tecnológica para reducción de residuos electrónicos.</p>
          <p><FileCode size={14} /> Desarrollado bajo estándares ANSI/IEEE 830 especificación de requisitos ERS.</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Ciber Shop Colombia • Centro de Materiales y Ensayos CME. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};
