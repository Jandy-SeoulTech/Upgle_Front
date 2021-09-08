import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/util/createRequestSaga';
import * as chatAPI from '../lib/api/chat';
import { call, put, takeLatest, throttle } from 'redux-saga/effects';

const INITIALIZE = 'chat/INITIALIZE';
const [GET_CHANNEL_MESSAGES, GET_CHANNEL_MESSAGES_SUCCESS, GET_CHANNEL_MESSAGES_FAILURE] =
  createRequestActionTypes('chat/GET_CHANNEL_MESSAGES');
const [SEND_CHANNEL_MESSAGE, SEND_CHANNEL_MESSAGE_SUCCESS, SEND_CHANNEL_MESSAGE_FAILURE] =
  createRequestActionTypes('chat/SEND_CHANNEL_MESSAGE');
const CONCAT_CHANNEL_MESSAGES = 'chat/CONCAT_CHANNEL_MESSAGES';
const [GET_ROOM_MESSAGES, GET_ROOM_MESSAGES_SUCCESS, GET_ROOM_MESSAGES_FAILURE] =
  createRequestActionTypes('chat/GET_ROOM_MESSAGES');
const [SEND_ROOM_MESSAGE, SEND_ROOM_MESSAGE_SUCCESS, SEND_ROOM_MESSAGE_FAILURE] =
  createRequestActionTypes('chat/SEND_ROOM_MESSAGE');
const [REPLY_ROOM_MESSAGE, REPLY_ROOM_MESSAGE_SUCCESS, REPLY_ROOM_MESSAGE_FAILURE] =
  createRequestActionTypes('chat/REPLY_ROOM_MESSAGE');
const CONCAT_ROOM_MESSAGES = 'chat/CONCAT_ROOM_MESSAGES';

export const initialize = createAction(INITIALIZE);
export const getChannelMessages = createAction(
  GET_CHANNEL_MESSAGES,
  ({ channelId, lastId }) => ({ channelId, lastId }),
);
export const sendChannelMessage = createAction(
  SEND_CHANNEL_MESSAGE,
  ({ channelId, content }) => ({ channelId, content }),
);
export const concatChannelMessages = createAction(
  CONCAT_CHANNEL_MESSAGES,
  (message) => message,
);
export const getRoomMessages = createAction(
  GET_ROOM_MESSAGES,
  ({ roomId, lastId }) => ({ roomId, lastId }),
);
export const sendRoomMessage = createAction(
  SEND_ROOM_MESSAGE,
  ({ roomId, content }) => ({ roomId, content }),
);
export const replyRoomMessage = createAction(
  REPLY_ROOM_MESSAGE,
  ({ roomId, answerId, content }) => ({ roomId, answerId, content }),
);
export const concatRoomMessages = createAction(
  CONCAT_ROOM_MESSAGES,
  (message) => message,
);

export function* getChannelMessagesSaga(action) {
  try {
    const response = yield call(chatAPI.getChannelMessages, action.payload);
    if (response.data.length > 0) {
      yield put({
        type: GET_CHANNEL_MESSAGES_SUCCESS,
        payload: response.data,
        meta: response,
      });
    }
  } catch (e) {
    yield put({
      type: GET_CHANNEL_MESSAGES_FAILURE,
      payload: e,
      error: true,
    });
  }
}

const sendChannelMessageSaga = createRequestSaga(SEND_CHANNEL_MESSAGE, chatAPI.sendChannelMessage);

export function* getRoomMessagesSaga(action) {
  try {
    const response = yield call(chatAPI.getRoomMessages, action.payload);
    if (response.data.length > 0) {
      yield put({
        type: GET_ROOM_MESSAGES_SUCCESS,
        payload: response.data,
        meta: response,
      });
    }
  } catch (e) {
    yield put({
      type: GET_ROOM_MESSAGES_FAILURE,
      payload: e,
      error: true,
    });
  }
}

const sendRoomMessageSaga = createRequestSaga(SEND_ROOM_MESSAGE, chatAPI.sendRoomMessage);
const sendReplyMessageSaga = createRequestSaga(REPLY_ROOM_MESSAGE, chatAPI.replyRoomMessage);

export function* chatSaga() {
  yield throttle(5000, GET_CHANNEL_MESSAGES, getChannelMessagesSaga);
  yield takeLatest(SEND_CHANNEL_MESSAGE, sendChannelMessageSaga);
  yield throttle(5000, GET_ROOM_MESSAGES, getRoomMessagesSaga);
  yield takeLatest(SEND_ROOM_MESSAGE, sendRoomMessageSaga);
  yield takeLatest(REPLY_ROOM_MESSAGE, sendReplyMessageSaga);
}

const initialState = {
  messages: [],
  lastId: null,
  error: null,
};

const chat = handleActions(
  {
    [GET_CHANNEL_MESSAGES_SUCCESS]: (state, { payload }) => ({
      ...state,
      messages: state.messages.concat(payload),
      lastId: payload[payload.length - 1].id,
    }),
    [GET_CHANNEL_MESSAGES_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [CONCAT_CHANNEL_MESSAGES]: (state, { payload: message }) => ({
      ...state,
      messages: [message, ...state.messages],
    }),
    [GET_ROOM_MESSAGES_SUCCESS]: (state, { payload }) => ({
      ...state,
      messages: state.messages.concat(payload),
      lastId: payload[payload.length - 1].id,
    }),
    [GET_ROOM_MESSAGES_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [CONCAT_ROOM_MESSAGES]: (state, { payload: message }) => ({
      ...state,
      messages: [message, ...state.messages],
    }),
    [INITIALIZE]: () => initialState,
  },
  initialState,
);

export default chat;
