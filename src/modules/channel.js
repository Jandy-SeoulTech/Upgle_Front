import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender/lib/utils';
import * as channelAPI from '../lib/api/channel';

const GET_CHANNEL_DATA = 'channel/GET_CHANNEL_DATA';
const GET_MYCHANNEL = 'channel/GET_MYCHANNEL';
const ENTER_CHANNEL = 'channel/ENTER_CHANNEL';
const EXIT_CHANNEL = 'channel/EXIT_CHANNEL';
const LIKE_CHANNEL = 'channel/LIKE_CHANNEL';
const UNLIKE_CHANNEL = 'channel/UNLIKE_CHANNEL';
const INITIAL_CHANNEL = 'channel/INITIAL_CHANNEL';

export const getChannelData = createAction(GET_CHANNEL_DATA, channelAPI.getChannelData);
export const getMychannel = createAction(GET_MYCHANNEL, channelAPI.getMyChannel);
export const enterChannel = createAction(ENTER_CHANNEL);
export const exitChannel = createAction(EXIT_CHANNEL, channelAPI.exitChannel);
export const likeChannel = createAction(LIKE_CHANNEL, channelAPI.likeChannel);
export const unLikeChannel = createAction(UNLIKE_CHANNEL, channelAPI.unlikeChannel);
export const initailChannel = createAction(INITIAL_CHANNEL);

const initialState = {
  myChannel: null,
  channel: null,
  success: null,
  error: null,
};

const channel = handleActions(
  {
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
