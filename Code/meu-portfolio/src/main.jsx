import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './i18n/i18n.js'   // inicializa as traduções
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)