// src/App.tsx
import React from 'react';
import AppRouter from './routes/Router';
import { BrowserRouter } from 'react-router-dom';
import './styles/global.css'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
