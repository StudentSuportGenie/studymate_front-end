// src/main.jsx or src/index.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import './index.css'
import App from './App.jsx'
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from './authConfig';
import { ThemeModeProvider } from './ThemeContext';
import CssBaseline from '@mui/material/CssBaseline';

const msalInstance = new PublicClientApplication(msalConfig);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <MsalProvider instance={msalInstance}>
        <ThemeModeProvider>
          <CssBaseline />
          <App />
        </ThemeModeProvider>
      </MsalProvider>
    </Provider>
  </React.StrictMode>
);
