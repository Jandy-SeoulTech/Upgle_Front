import { createAction, handleActions } from 'redux-actions';
import * as chatAPI from '../lib/api/chat';
import { pender } from 'redux-pender/lib/utils';

const INITIALIZE = 'chat/INITIALIZE';
const GET_CHANNEL_MESSAGES = 'chat/GET_CHANNEL_MESSAGES';
const SEND_CHANNEL_MESSAGE = 'chat/SEND_CHANNEL_MESSAGE';
const CONCAT_CHANNEL_MESSAGES = 'chat/CONCAT_CHANNEL_MESSAGES';
const GET_ROOM_MESSAGES = 'chat/GET_ROOM_MESSAGES';
const GET_ANSWER_LIST = 'chat/GET_ANSWER_LIST';
const SEND_ROOM_MESSAGE = 'chat/SEND_ROOM_MESSAGE';
const REPLY_ROOM_MESSAGE = 'chat/REPLY_ROOM_MESSAGE';
const CONCAT_ROOM_MESSAGES = 'chat/CONCAT_ROOM_MESSAGES';

export const initialize = createAction(INITIALIZE);
export const getChannelMessages = createAction(GET_CHANNEL_MESSAGES, chatAPI.getChannelMessages);
export const sendChannelMessage = createAction(SEND_CHANNEL_MESSAGE, chatAPI.sendChannelMessage);
export const concatChannelMessages = createAction(CONCAT_CHANNEL_MESSAGES, (message) => message);
export const getRoomMessages = createAction(GET_ROOM_MESSAGES, chatAPI.getRoomMessages);
export const sendRoomMessage = createAction(SEND_ROOM_MESSAGE, chatAPI.sendRoomMessage);
export const replyRoomMessage = createAction(REPLY_ROOM_MESSAGE, chatAPI.replyRoomMessage);
export const getAnswerList = createAction(GET_ANSWER_LIST, chatAPI.getAnswerList);
export const concatRoomMessages = createAction(CONCAT_ROOM_MESSAGES, (message) => message);

const initialState = {
  messages: [],
  answerList: null,
  lastId: null,
  error: null,
};

const chat = handleActions(
  {
    [CONCAT_CHANNEL_MESSAGES]: (state, { payload: message }) => ({
      ...state,
      messages: [message, ...state.messages],
    }),
    [CONCAT_ROOM_MESSAGES]: (state, { payload: message }) => ({
      ...state,
      messages: [message, ...state.messages],
    }),
    ...pender({
      type: GET_CHANNEL_MESSAGES,
      onSuccess: (state, { payload }) => ({
        ...state,
        messages: state.messages.concat(payload),
        lastId: payload[payload.length - 1].id,
      }),
    }),
    ...pender({
      type: GET_ROOM_MESSAGES,
      onSuccess: (state, { payload }) => ({
        ...state,
        messages: state.messages.concat(payload),
        lastId: payload[payload.length - 1].id,
      }),
    }),
    ...pender({
      type: SEND_CHANNEL_MESSAGE,
    }),
    ...pender({
      type: GET_ROOM_MESSAGES,
      onSuccess: (state, { payload }) => ({
        ...state,
        messages: state.messages.concat(payload),
        lastId: payload[payload.length - 1].id,
      }),
    }),
    ...pender({
      type: REPLY_ROOM_MESSAGE,
      onSuccess: (state, { payload }) => ({
        ...state,
        messages: state.messages.concat(payload),
        lastId: payload[payload.length - 1].id,
      }),
    }),
    ...pender({
      type: GET_ANSWER_LIST,
      onSuccess: (state, { payload }) => ({
        ...state,
        answerList: payload,
      }),
    }),
    [INITIALIZE]: () => initialState,
  },
  initialState,
);

export default chat;
