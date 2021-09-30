import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './modules';
import penderMiddleware from 'redux-pender';
import logger from 'redux-logger';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(penderMiddleware(), logger)),
);

export default store;
