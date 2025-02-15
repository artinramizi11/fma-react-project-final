import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { PageContextProvider } from './context/PageContext';
import './i18n'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <HashRouter>
    <PageContextProvider>
    <App />
    </PageContextProvider>
   </HashRouter>
  </React.StrictMode>
);
