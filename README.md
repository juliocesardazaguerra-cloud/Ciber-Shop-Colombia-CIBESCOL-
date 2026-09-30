# Ciber Shop Colombia (CIBESCOL) - Proyecto React E-Commerce

Este es el proyecto frontend oficial de **Ciber Shop Colombia**, desarrollado en **React** con **Vite**. Implementa la Especificación de Requisitos de Software (ERS) definida bajo los estándares SENA / IEEE 830.

---

## 🚀 Guía de Inicio Rápido en Visual Studio Code

### Requisitos Previos
- Tener instalado **Node.js** (versión 16.x o superior): [Descargar Node.js](https://nodejs.org/)
- Tener instalado **Visual Studio Code**: [Descargar VS Code](https://code.visualstudio.com/)

---

### Pasos para Ejecutar en Visual Studio Code

1. **Descomprimir el proyecto:**
   Extrae el archivo ZIP en una carpeta de tu computadora.

2. **Abrir en Visual Studio Code:**
   - Abre Visual Studio Code.
   - Ve a `Archivo > Abrir carpeta...` (`File > Open Folder...`).
   - Selecciona la carpeta descomprimida `ciber-shop-colombia`.

3. **Abrir la Terminal integrada:**
   - En VS Code, abre la terminal desde el menú superior: `Terminal > Nueva Terminal` (o presiona `Ctrl + ~`).

4. **Instalar dependencias:**
   Ejecuta el siguiente comando en la terminal:
   ```bash
   npm install
   ```

5. **Iniciar el servidor de desarrollo:**
   Ejecuta:
   ```bash
   npm run dev
   ```

6. **Abrir en el navegador:**
   Haz clic en la URL que aparece en la terminal (por defecto `http://localhost:5173`) o mantén presionado `Ctrl` y haz clic en el enlace.

---

## 🛠️ Requerimientos Funcionales Implementados (RF)

| Código | Módulo / Funcionalidad | Descripción |
| :--- | :--- | :--- |
| **RF01/RF02** | Gestión de Usuarios y Roles | Cambio de rol (Cliente / Administrador) y autenticación simulada. |
| **RF03/RF16** | Catálogo Multiformato y Atributos Dinámicos | Soporte especial para Hardware (garantía, stock), Software (licencias) y Servicios Técnicos (mantenimiento/instalación). |
| **RF04/RF05** | Gestión de Inventario y Stock en Tiempo Real | Verificación de existencias antes de agregar al carrito y control en panel de admin. |
| **RF06** | Catálogo Interactivo | Filtros por categoría (Hardware, Software, Servicio), rango de precios y búsqueda en tiempo real. |
| **RF07/RF08** | Carrito y Motor de Ventas Cruzadas (Add-ons) | Recomendación automática de servicios de instalación o accesorios al comprar Hardware. |
| **RF09** | Panel de Reseñas y Reputación | Sistema de valoraciones con estrellas para compradores verificados. |
| **RF10/RF11** | Facturación y Pasarela de Pagos | Simulación de pago con Tarjeta, Nequi y Daviplata con generación de factura digital. |
| **RF12/RF13** | Seguimiento y Rastreo GPS de Envíos | Mapa interactivo de ruta y barra de progreso del estado del pedido en tiempo real. |
| **RF14/RF15** | Notificaciones y Historial de Transacciones | Registro de pedidos realizados y avisos del sistema. |

---

## 👥 Créditos
**Proyecto SENA ADSO 3387641** - Centro de Materiales y Ensayos CME
- Carlos Andrés Mantilla Hernández
- Juan Sebastián Cepeda Castro
- Julio César Daza Guerra
