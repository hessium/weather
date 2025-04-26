import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeManager } from './components/theme-manager/theme-manager.tsx';
import { ErrorBoundaryLayout } from './containers/error-boundary/error-boundary.tsx';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

import './index.css';

import App from './app.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundaryLayout>
      <BrowserRouter>
        <Provider store={store}>
          <ThemeManager />
          <App />
        </Provider>
      </BrowserRouter>
    </ErrorBoundaryLayout>
  </StrictMode>,
);
