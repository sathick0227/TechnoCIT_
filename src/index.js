import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './Redux/reducer'
import {createStore} from 'redux';
const mainstore = createStore(store);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={mainstore}>
      <App />
    </Provider>
  </React.StrictMode>
);


