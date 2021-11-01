import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer, { rootSaga } from './modules';
import penderMiddleware from 'redux-pender';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(penderMiddleware(), sagaMiddleware, logger)),
);

sagaMiddleware.run(rootSaga);

export default store;
