import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
document.addEventListener('click', (e) => {
  const a = e.target.closest && e.target.closest('a[href*="wa.me/"]')
  if (a) { e.preventDefault(); alert('En la web real, acá se abre WhatsApp con el mensaje ya armado.') }
}, true)
ReactDOM.createRoot(document.getElementById('root')).render(<App />)
