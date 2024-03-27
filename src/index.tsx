import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers';
import { thunk } from 'redux-thunk';
import { compose, createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from "react-router-dom";
import {store} from "./services/store";

// declare global {
//     interface Window {
//         __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//     }
// }
//
// const composeEnhancers =
//     typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//         ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//         : compose;

// Указание корректного типа для root элемента
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);

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
