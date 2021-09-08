import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/util/createRequestSaga';
import * as chatAPI from '../lib/api/chat';
import { call, put, takeLatest, throttle } from 'redux-saga/effects';

const INITIALIZE = 'chat/INITIALIZE';
const [GET_MESSAGES, GET_MESSAGES_SUCCESS, GET_MESSAGES_FAILURE] =
  createRequestActionTypes('chat/GET_MESSAGES');
const [SEND_MESSAGE, SEND_MESSAGE_SUCCESS, SEND_MESSAGE_FAILURE] =
  createRequestActionTypes('chat/SEND_MESSAGE');
const CONCAT_MESSAGES = 'chat/SET_MESSAGE';

export const initialize = createAction(INITIALIZE);
export const getMessages = createAction(
  GET_MESSAGES,
  ({ channelId, lastId }) => ({ channelId, lastId }),
);
export const sendMessage = createAction(
  SEND_MESSAGE,
  ({ channelId, content }) => ({ channelId, content }),
);
export const concatMessages = createAction(
  CONCAT_MESSAGES,
  (message) => message,
);

export function* getMessagesSaga(action) {
  try {
    const response = yield call(chatAPI.getMessages, action.payload);
    if (response.data.length > 0) {
      yield put({
        type: GET_MESSAGES_SUCCESS,
        payload: response.data,
        meta: response,
      });
    }
  } catch (e) {
    yield put({
      type: GET_MESSAGES_FAILURE,
      payload: e,
      error: true,
    });
  }
}

const sendMessageSaga = createRequestSaga(SEND_MESSAGE, chatAPI.sendMessage);

export function* chatSaga() {
  yield throttle(5000, GET_MESSAGES, getMessagesSaga);
  yield takeLatest(SEND_MESSAGE, sendMessageSaga);
}

const initialState = {
  messages: [],
  lastId: null,
  error: null,
};

const chat = handleActions(
  {
    [GET_MESSAGES_SUCCESS]: (state, { payload }) => ({
      ...state,
      messages: state.messages.concat(payload),
      lastId: payload[payload.length - 1].id,
    }),
    [GET_MESSAGES_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [CONCAT_MESSAGES]: (state, { payload: message }) => ({
      ...state,
      messages: [message, ...state.messages],
    }),
    [INITIALIZE]: () => initialState,
  },
  initialState,
);

export default chat;
