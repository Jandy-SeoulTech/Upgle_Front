import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender/lib/utils';
import * as roomAPI from '../lib/api/room';

const CREATE_ROOM = 'chat/CREATE_ROOM';
const GET_ROOM_DATA = 'chat/GET_ROOM_DATA';
const GET_ROOM_LIST = 'chat/GET_ROOM_LIST';
const EXIT_ROOM = 'chat/EXIT_ROOM';
const CLOSE_ROOM = 'chat/CLOSE_ROOM';
const REVIEW_ROOM = 'chat/REVIEW_ROOM';

export const getRoomList = createAction(GET_ROOM_LIST, roomAPI.getRoomList);
export const createRoom = createAction(CREATE_ROOM, roomAPI.createRoom);
export const getRoomData = createAction(GET_ROOM_DATA, roomAPI.getRoomData);
export const exitRoom = createAction(EXIT_ROOM, roomAPI.exitRoom);
export const closeRoom = createAction(CLOSE_ROOM, roomAPI.closeRoom);
export const reviewRoom = createAction(REVIEW_ROOM, roomAPI.reviewRoom);

const initialState = {
  room: null,
  roomList: null,
  error: null,
  reviewSuccess: null,
  userExit: null,
};

const chat = handleActions(
  {
    ...pender({
      type: CREATE_ROOM,
      onFailure: (state, { payload: error }) => ({ ...state, error }),
    }),
    ...pender({
      type: GET_ROOM_DATA,
      onSuccess: (state, { payload }) => ({ ...state, room: payload }),
    }),
    ...pender({
      type: GET_ROOM_LIST,
      onSuccess: (state, { payload }) => ({ ...state, roomList: payload }),
    }),
    ...pender({
      type: GET_ROOM_LIST,
      onSuccess: (state, { payload }) => ({ ...state, roomList: payload }),
      onFailure: (state, { payload: error }) => ({ ...state, error }),
    }),
    ...pender({
      type: EXIT_ROOM,
      onPending: (state) => ({ ...state, userExit: null }),
      onSuccess: (state) => ({ ...state, userExit: true }),
      onFailure: (state, { payload: error }) => ({ ...state, error }),
    }),
    ...pender({
      type: EXIT_ROOM,
      onPending: (state) => ({ ...state, userExit: null }),
      onSuccess: (state) => ({ ...state, userExit: true }),
      onFailure: (state, { payload: error }) => ({ ...state, error }),
    }),
    ...pender({
      type: CLOSE_ROOM,
      onPending: (state) => ({ ...state, userExit: null }),
      onSuccess: (state) => ({ ...state, userExit: true }),
      onFailure: (state, { payload: error }) => ({ ...state, error }),
    }),
    ...pender({
      type: REVIEW_ROOM,
      onPending: (state) => ({ ...state, reviewSuccess: null }),
      onSuccess: (state) => ({ ...state, reviewSuccess: true }),
      onFailure: (state, { payload: error }) => ({ ...state, error }),
    }),
  },
  initialState,
);

export default chat;
