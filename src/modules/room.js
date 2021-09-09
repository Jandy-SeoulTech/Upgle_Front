import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/util/createRequestSaga';
import * as roomAPI from '../lib/api/room';
import { takeLatest } from '@redux-saga/core/effects';

const [CREATE_ROOM, CREATE_ROOM_SUCCESS, CREATE_ROOM_FAILURE] =
  createRequestActionTypes('chat/CREATE_ROOM');
const [GET_ROOM_DATA, GET_ROOM_DATA_SUCCESS, GET_ROOM_DATA_FAILURE] =
  createRequestActionTypes('chat/GET_ROOM_DATA');
const [GET_ROOM_LIST, GET_ROOM_LIST_SUCCESS, GET_ROOM_LIST_FAILURE] =
  createRequestActionTypes('chat/GET_ROOM_LIST');
const [EXIT_ROOM, EXIT_ROOM_SUCCESS, EXIT_ROOM_FAILURE] =
  createRequestActionTypes('chat/EXIT_ROOM');
const [CLOSE_ROOM, CLOSE_ROOM_SUCCESS, CLOSE_ROOM_FAILURE] =
  createRequestActionTypes('chat/CLOSE_ROOM');
const [REVIEW_ROOM, REVIEW_ROOM_SUCCESS, REVIEW_ROOM_FAILURE] =
  createRequestActionTypes('chat/REVIEW_ROOM');

export const createRoom = createAction(
  CREATE_ROOM,
  ({ status, name, channelId, postId, reservedTime }) => ({
    status,
    name,
    channelId,
    postId,
    reservedTime,
  }),
);
export const getRoomData = createAction(GET_ROOM_DATA, ({ roomId }) => ({
  roomId,
}));
export const getRoomList = createAction(GET_ROOM_LIST, ({ channelId }) => ({
  channelId,
}));
export const exitRoom = createAction(EXIT_ROOM, ({ roomId }) => ({
  roomId,
}));
export const closeRoom = createAction(CLOSE_ROOM, ({ roomId }) => ({
  roomId,
}));
export const reviewRoom = createAction(
  REVIEW_ROOM,
  ({ roomId, content, status, reviewedUserId }) => ({
    roomId,
    content,
    status,
    reviewedUserId,
  }),
);

const createRoomSaga = createRequestSaga(CREATE_ROOM, roomAPI.createRoom);
const getRoomDataSaga = createRequestSaga(GET_ROOM_DATA, roomAPI.getRoomData);
const getRoomListSaga = createRequestSaga(GET_ROOM_LIST, roomAPI.getRoomList);
const exitRoomSaga = createRequestSaga(EXIT_ROOM, roomAPI.exitRoom);
const closeRoomSaga = createRequestSaga(CLOSE_ROOM, roomAPI.closeRoom);
const reviewRoomSaga = createRequestSaga(REVIEW_ROOM, roomAPI.reviewRoom);

export function* roomSaga() {
  yield takeLatest(CREATE_ROOM, createRoomSaga);
  yield takeLatest(GET_ROOM_DATA, getRoomDataSaga);
  yield takeLatest(GET_ROOM_LIST, getRoomListSaga);
  yield takeLatest(EXIT_ROOM, exitRoomSaga);
  yield takeLatest(CLOSE_ROOM, closeRoomSaga);
  yield takeLatest(REVIEW_ROOM, reviewRoomSaga);
}

const initialState = {
  room: null,
  roomList: null,
  error: null,
  success: null,
};

const chat = handleActions(
  {
    [CREATE_ROOM_FAILURE]: (state, { payload: error }) => ({ ...state, error }),
    [GET_ROOM_DATA_SUCCESS]: (state, { payload }) => ({
      ...state,
      room: payload.data,
      success: true,
    }),
    [GET_ROOM_LIST_SUCCESS]: (state, { payload }) => ({
      ...state,
      roomList: payload.data,
      success: true,
    }),
    [GET_ROOM_LIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
      success: true,
    }),
    [EXIT_ROOM]: (state) => ({ ...state, success: null }),
    [EXIT_ROOM_SUCCESS]: (state) => ({ ...state, success: true }),
    [EXIT_ROOM_FAILURE]: (state, { payload: error }) => ({ ...state, error }),
    [CLOSE_ROOM]: (state) => ({ ...state, success: null }),
    [CLOSE_ROOM_SUCCESS]: (state) => ({ ...state, success: true }),
    [CLOSE_ROOM_FAILURE]: (state, { payload: error }) => ({ ...state, error }),
    [REVIEW_ROOM_SUCCESS]: (state) => ({ ...state, success: true }),
    [REVIEW_ROOM_FAILURE]: (state, { payload: error }) => ({ ...state, error }),
  },
  initialState,
);

export default chat;
