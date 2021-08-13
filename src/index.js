import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { applyMiddleware, createStore } from 'redux';
import rootReducer, { rootSaga } from './modules';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { HelmetProvider } from 'react-helmet-async';
import CssBaseline from '@material-ui/core/CssBaseline';
import '@fontsource/noto-sans-kr';
import '@fontsource/roboto';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware, logger)),
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <HelmetProvider>
      <CssBaseline />
      <App />
    </HelmetProvider>
  </Provider>,
  document.getElementById('root'),
);
