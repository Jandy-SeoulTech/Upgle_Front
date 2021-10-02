import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender/lib/utils';
import * as channelAPI from '../lib/api/channel';
import * as roomAPI from '../lib/api/room';

const WRITE_CHANNEL_POST = 'channel/WRITE_CHANNEL_POST';
const GET_ROOM_LIST = 'channel/GET_ROOM_LIST';
const GET_CHANNEL_POST_LIST = 'channel/GET_CHANNEL_POST_LIST';
const GET_CHANNEL_POST = 'channel/GET_CHANNEL_POST';
const GET_CHANNEL_DATA = 'channel/GET_CHANNEL_DATA';
const GET_MYCHANNEL = 'channel/GET_MYCHANNEL';
const ENTER_CHANNEL = 'channel/ENTER_CHANNEL';
const EXIT_CHANNEL = 'channel/EXIT_CHANNEL';
const LIKE_CHANNEL = 'channel/LIKE_CHANNEL';
const UNLIKE_CHANNEL = 'channel/UNLIKE_CHANNEL';
const INITIAL_CHANNEL = 'channel/INITIAL_CHANNEL';

export const writeChannelPost = createAction(WRITE_CHANNEL_POST, channelAPI.writeChannelPost);
export const getRoomList = createAction(GET_ROOM_LIST, roomAPI.getRoomList);
export const getChannelPostList = createAction(
  GET_CHANNEL_POST_LIST,
  channelAPI.getChannelPostList,
);
export const getChannelPost = createAction(GET_CHANNEL_POST, channelAPI.getChannelPost);
export const getChannelData = createAction(GET_CHANNEL_DATA, channelAPI.getChannelData);
export const getMychannel = createAction(GET_MYCHANNEL, channelAPI.getMyChannel);
export const enterChannel = createAction(ENTER_CHANNEL, channelAPI.enterChannel);
export const exitChannel = createAction(EXIT_CHANNEL, channelAPI.exitChannel);
export const likeChannel = createAction(LIKE_CHANNEL, channelAPI.likeChannel);
export const unLikeChannel = createAction(UNLIKE_CHANNEL, channelAPI.unlikeChannel);
export const initailChannel = createAction(INITIAL_CHANNEL);

const initialState = {
  roomList: null,
  postList: null,
  post: null,
  myChannel: null,
  channel: null,
  success: null,
  writeSuccess: null,
  error: null,
};

const channel = handleActions(
  {
    ...pender({
      type: WRITE_CHANNEL_POST,
      onPending: (state) => ({
        ...state,
        writeSuccess: null,
      }),
      onSuccess: (state, { payload: writeSuccess }) => ({
        ...state,
        writeSuccess,
      }),
      onFailure: (state, { payload: error }) => ({
        ...state,
        error,
      }),
    }),
    ...pender({
      type: GET_ROOM_LIST,
      onSuccess: (state, { payload: roomList }) => ({
        ...state,
        roomList,
      }),
      onFailure: (state, { payload: error }) => ({
        ...state,
        error,
      }),
    }),
    ...pender({
      type: GET_CHANNEL_POST_LIST,
      onSuccess: (state, { payload: postList }) => ({
        ...state,
        postList,
      }),
      onFailure: (state, { payload: error }) => ({
        ...state,
        error,
      }),
    }),
    ...pender({
      type: GET_CHANNEL_POST,
      onSuccess: (state, { payload: post }) => ({
        ...state,
        post,
      }),
      onFailure: (state, { payload: error }) => ({
        ...state,
        error,
      }),
    }),
    ...pender({
      type: GET_CHANNEL_DATA,
      onSuccess: (state, { payload: channel }) => ({
        ...state,
        channel,
      }),
      onFailure: (state, { payload: error }) => ({
        ...state,
        error,
      }),
    }),
    ...pender({
      type: GET_CHANNEL_DATA,
      onSuccess: (state, { payload: channel }) => ({
        ...state,
        channel,
      }),
      onFailure: (state, { payload: error }) => ({
        ...state,
        error,
      }),
    }),
    ...pender({
      type: GET_MYCHANNEL,
      onSuccess: (state, { payload: myChannel }) => ({
        ...state,
        myChannel,
      }),
      onFailure: (state, { payload: error }) => ({
        ...state,
        error,
      }),
    }),
    ...pender({
      type: ENTER_CHANNEL,
      onPending: (state) => ({
        ...state,
        success: null,
      }),
      onSuccess: (state, { payload: success }) => ({
        ...state,
        success,
      }),
      onFailure: (state, { payload: error }) => ({
        ...state,
        error,
      }),
    }),
    ...pender({
      type: EXIT_CHANNEL,
      onPending: (state) => ({
        ...state,
        success: null,
      }),
      onSuccess: (state, { payload: success }) => ({
        ...state,
        success,
      }),
    }),
    ...pender({
      type: LIKE_CHANNEL,
      onSuccess: (state, { payload: channel }) => ({
        ...state,
        channel,
      }),
    }),
    ...pender({
      type: UNLIKE_CHANNEL,
      onSuccess: (state, { payload: channel }) => ({
        ...state,
        channel,
      }),
    }),
    [INITIAL_CHANNEL]: () => initialState,
  },
  initialState,
);

export default channel;
