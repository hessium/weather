import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

import './index.css';

import App from './app.tsx';
import { ThemeManager } from './components/theme-manager/theme-manager.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeManager />
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
