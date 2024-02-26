import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './app/store.ts';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);