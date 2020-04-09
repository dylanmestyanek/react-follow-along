import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import burgerBuilderReducer from './store/reducers/burgerBuilderReducer';
import orderReducer from './store/reducers/orderReducer';
import authReducer from './store/reducers/authReducer';

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
<Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
</Provider>
, document.getElementById('root'));
registerServiceWorker();
