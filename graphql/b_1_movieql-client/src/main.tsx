import React from 'react';
import ReactDOM from 'react-dom/client';
import apolloClient from './apolloClient';
import App from './App';

apolloClient;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
