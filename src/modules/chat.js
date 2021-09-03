import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/util/createRequestSaga';
import * as chatAPI from '../lib/api/chat';
import { takeLatest } from 'redux-saga/effects';

const [GET_MESSAGES, GET_MESSAGES_SUCCESS, GET_MESSAGES_FAILURE] =
  createRequestActionTypes('chat/GET_MESSAGES');
const [SEND_MESSAGE, SEND_MESSAGE_SUCCESS, SEND_MESSAGE_FAILURE] =
  createRequestActionTypes('chat/SEND_MESSAGE');
const CONCAT_MESSAGES = 'chat/SET_MESSAGE';

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

const getMessagesSaga = createRequestSaga(GET_MESSAGES, chatAPI.getMessages);
const sendMessageSaga = createRequestSaga(SEND_MESSAGE, chatAPI.sendMessage);

export function* chatSaga() {
  yield takeLatest(GET_MESSAGES, getMessagesSaga);
  yield takeLatest(SEND_MESSAGE, sendMessageSaga);
}

const initialState = {
  messages: [],
  error: null,
};

const chat = handleActions(
  {
    [GET_MESSAGES_SUCCESS]: (state, { payload }) => ({
      ...state,
      messages: [...payload, ...state.messages],
    }),
    [GET_MESSAGES_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [CONCAT_MESSAGES]: (state, { payload: message }) => ({
      ...state,
      messages: state.messages.concat(message),
    }),
  },
  initialState,
);

export default chat;
