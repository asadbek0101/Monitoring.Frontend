import React from 'react';
import ReactDOM from 'react-dom/client';
import RootContainer from './containers/RootContainer';

import { Provider } from 'react-redux';
import { ProviderContainer } from './containers/ProviderContainer';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from './store/configureStore';
import { ToastContainer } from 'react-toastify';

import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = configureStore();

root.render(
  <React.StrictMode>
    <Provider store={store.store}>
        <ProviderContainer>
           <BrowserRouter>
              <RootContainer />
              <ToastContainer/>
           </BrowserRouter>
        </ProviderContainer>
      </Provider>
  </React.StrictMode>
);
