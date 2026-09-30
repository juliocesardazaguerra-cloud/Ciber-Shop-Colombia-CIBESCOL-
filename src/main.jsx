import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppContent } from './App'
import { ShopProvider } from './context/ShopContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  </React.StrictMode>,
)
