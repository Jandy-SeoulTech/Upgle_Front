import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender/lib/utils';
import * as roomAPI from '../lib/api/room';

const CREATE_ROOM = 'room/CREATE_ROOM';
const GET_ROOM_DATA = 'room/GET_ROOM_DATA';
const GET_ROOM_LIST = 'room/GET_ROOM_LIST';
const EXIT_ROOM = 'room/EXIT_ROOM';
const CLOSE_ROOM = 'room/CLOSE_ROOM';
const REVIEW_ROOM = 'room/REVIEW_ROOM';

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
};

export default handleActions(
  {
    ...pender({
      type: GET_ROOM_DATA,
      onSuccess: (state, { payload }) => ({ ...state, room: payload }),
    }),
    ...pender({
      type: GET_ROOM_LIST,
      onSuccess: (state, { payload }) => ({ ...state, roomList: payload }),
    }),
  },
  initialState,
);
