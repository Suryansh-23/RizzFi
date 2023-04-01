import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Popup'
import './index.css'

import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'primereact/resources/themes/lara-dark-purple/theme.css'

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
