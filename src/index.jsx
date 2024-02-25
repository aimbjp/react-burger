import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers';
import { thunk } from 'redux-thunk';
import { compose, createStore, applyMiddleware } from 'redux';
import {BrowserRouter} from "react-router-dom";

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Provider store={store}>
                  <App />
          </Provider>
      </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
