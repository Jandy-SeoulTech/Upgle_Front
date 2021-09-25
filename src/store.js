import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer, { rootSaga } from './modules';
import penderMiddleware from 'redux-pender';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware, penderMiddleware(), logger)),
);

sagaMiddleware.run(rootSaga);

export default store;
