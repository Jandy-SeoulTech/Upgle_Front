import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender/lib/utils';
import * as channelAPI from '../lib/api/channel';

const PASS_ADMIN = 'channel/PASS_ADMIN';
const BAN_USER = 'channel/BAN_USER';
const GET_CHANNEL_DATA = 'channel/GET_CHANNEL_DATA';
const GET_MYCHANNEL = 'channel/GET_MYCHANNEL';
const ENTER_CHANNEL = 'channel/ENTER_CHANNEL';
const EXIT_CHANNEL = 'channel/EXIT_CHANNEL';
const LIKE_CHANNEL = 'channel/LIKE_CHANNEL';
const UNLIKE_CHANNEL = 'channel/UNLIKE_CHANNEL';
const INIT_CHANNEL = 'channel/INIT_CHANNEL';

export const passAdmin = createAction(PASS_ADMIN, channelAPI.passAdmin);
export const banUser = createAction(BAN_USER, channelAPI.banUser);
export const getChannelData = createAction(GET_CHANNEL_DATA, channelAPI.getChannelData);
export const getMychannel = createAction(GET_MYCHANNEL, channelAPI.getMyChannel);
export const enterChannel = createAction(ENTER_CHANNEL, channelAPI.enterChannel);
export const exitChannel = createAction(EXIT_CHANNEL, channelAPI.exitChannel);
export const likeChannel = createAction(LIKE_CHANNEL, channelAPI.likeChannel);
export const unLikeChannel = createAction(UNLIKE_CHANNEL, channelAPI.unlikeChannel);
export const initChannel = createAction(INIT_CHANNEL);

const initialState = {
  myChannel: null,
  channel: null,
  error: null,
};

const channel = handleActions(
  {
    [INIT_CHANNEL]: () => initialState,
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
    ...pender({
      type: BAN_USER,
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
      type: PASS_ADMIN,
      onSuccess: (state, { payload: channel }) => ({
        ...state,
        channel,
      }),
      onFailure: (state, { payload: error }) => ({
        ...state,
        error,
      }),
    }),
  },
  initialState,
);

export default channel;
