import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import styles from './styles.scss'
import { BrowserRouter } from 'react-router-dom';

const node = document.getElementById('root');
const root = createRoot(node);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
