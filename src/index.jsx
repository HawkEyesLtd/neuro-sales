import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import '@ant-design/v5-patch-for-react-19';
import App from './App';
import store from './redux/app/store';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <HelmetProvider>
                    <App />
                </HelmetProvider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
