import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import App from './App';
import reducers from "./reducers";

const initialState = {};
const middleware = [thunk];

const store = createStore(reducers, initialState, compose(applyMiddleware(...middleware)));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// posible troubleshooting