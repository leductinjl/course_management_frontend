// src/App.tsx
import React from 'react';
import AppRouter from './routes/Router';
import { BrowserRouter } from 'react-router-dom';
import './styles/global.css'
import { StrictMode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
        <ToastContainer />
      </ThemeProvider>
    </StrictMode>
  );
};

export default App;
