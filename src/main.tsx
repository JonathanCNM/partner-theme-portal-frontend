import React from 'react';
import ReactDOM from 'react-dom/client';
// Usa App.dev.tsx para desarrollo sin Clerk
import App from './App.dev';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
