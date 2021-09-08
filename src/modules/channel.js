import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/util/createRequestSaga';
import * as channelAPI from '../lib/api/channel';
import { takeLatest } from 'redux-saga/effects';

const [GET_CHANNEL_LIST, GET_CHANNEL_LIST_SUCCESS, GET_CHANNEL_LIST_FAILURE] =
  createRequestActionTypes('channel/GET_CHANNEL_LIST');
const [GET_CHANNEL_DATA, GET_CHANNEL_DATA_SUCCESS, GET_CHANNEL_DATA_FAILURE] =
  createRequestActionTypes('channel/GET_CHANNEL_DATA');
const [GET_MYCHANNEL, GET_MYCHANNEL_SUCCESS, GET_MYCHANNEL_FAILURE] =
  createRequestActionTypes('channel/GET_MYCHANNEL');
const [ENTER_CHANNEL, ENTER_CHANNEL_SUCCESS, ENTER_CHANNEL_FAILURE] =
  createRequestActionTypes('channel/ENTER_CHANNEL');
const [EXIT_CHANNEL, EXIT_CHANNEL_SUCCESS, EXIT_CHANNEL_FAILURE] =
  createRequestActionTypes('channel/EXIT_CHANNEL');
const [LIKE_CHANNEL, LIKE_CHANNEL_SUCCESS, LIKE_CHANNEL_FAILURE] =
  createRequestActionTypes('channel/LIKE_CHANNEL');
const [UNLIKE_CHANNEL, UNLIKE_CHANNEL_SUCCESS, UNLIKE_CHANNEL_FAILURE] =
  createRequestActionTypes('channel/UNLIKE_CHANNEL');
const INITIAL_CHANNEL = 'channel/INITIAL_CHANNEL';

export const getChannelList = createAction(
  GET_CHANNEL_LIST,
  ({ userId }) => userId,
);
export const getChannelData = createAction(GET_CHANNEL_DATA, (id) => id);
export const getMychannel = createAction(GET_MYCHANNEL);
export const enterChannel = createAction(
  ENTER_CHANNEL,
  ({ adminId, channelId }) => ({ adminId, channelId }),
);
export const exitChannel = createAction(
  EXIT_CHANNEL,
  ({ adminId, channelId }) => ({ adminId, channelId }),
);
export const likeChannel = createAction(LIKE_CHANNEL, (channelId) => channelId);
export const unLikeChannel = createAction(
  UNLIKE_CHANNEL,
  (channelId) => channelId,
);
export const initailChannel = createAction(INITIAL_CHANNEL);

// Sagas
const getChannelListSaga = createRequestSaga(
  GET_CHANNEL_LIST,
  channelAPI.getChannelList,
);
const getChannelDataSaga = createRequestSaga(
  GET_CHANNEL_DATA,
  channelAPI.getChannelData,
);
const getMychannelSaga = createRequestSaga(
  GET_MYCHANNEL,
  channelAPI.getMyChannel,
);
const enterChannelSaga = createRequestSaga(
  ENTER_CHANNEL,
  channelAPI.enterChannel,
);
const exitChannelSaga = createRequestSaga(EXIT_CHANNEL, channelAPI.exitChannel);
const likeChannelSaga = createRequestSaga(LIKE_CHANNEL, channelAPI.likeChannel);
const unLikeChannelSaga = createRequestSaga(
  UNLIKE_CHANNEL,
  channelAPI.unlikeChannel,
);

export function* channelSaga() {
  yield takeLatest(GET_CHANNEL_LIST, getChannelListSaga);
  yield takeLatest(GET_CHANNEL_DATA, getChannelDataSaga);
  yield takeLatest(GET_MYCHANNEL, getMychannelSaga);
  yield takeLatest(ENTER_CHANNEL, enterChannelSaga);
  yield takeLatest(EXIT_CHANNEL, exitChannelSaga);
  yield takeLatest(LIKE_CHANNEL, likeChannelSaga);
  yield takeLatest(UNLIKE_CHANNEL, unLikeChannelSaga);
}

const initialState = {
  profileChannel: null,
  myChannel: null,
  channel: null,
  success: null,
  error: null,
};

const channel = handleActions(
  {
    [GET_CHANNEL_LIST_SUCCESS]: (state, { payload: profileChannel }) => ({
      ...state,
      profileChannel,
    }),
    [GET_CHANNEL_LIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [GET_CHANNEL_DATA_SUCCESS]: (state, { payload: channel }) => ({
      ...state,
      channel,
    }),
    [GET_CHANNEL_DATA_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [GET_CHANNEL_DATA_SUCCESS]: (state, { payload: channel }) => ({
      ...state,
      channel,
    }),
    [GET_CHANNEL_DATA_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [GET_MYCHANNEL_SUCCESS]: (state, { payload: myChannel }) => ({
      ...state,
      myChannel,
    }),
    [GET_MYCHANNEL_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [ENTER_CHANNEL]: (state) => ({
      ...state,
      success: null,
    }),
    [ENTER_CHANNEL_SUCCESS]: (state, { payload: success }) => ({
      ...state,
      success,
    }),
    [EXIT_CHANNEL]: (state) => ({
      ...state,
      success: null,
    }),
    [EXIT_CHANNEL_SUCCESS]: (state, { payload: success }) => ({
      ...state,
      success,
    }),
    [LIKE_CHANNEL_SUCCESS]: (state, { payload: channel }) => ({
      ...state,
      channel,
    }),
    [UNLIKE_CHANNEL_SUCCESS]: (state, { payload: channel }) => ({
      ...state,
      channel,
    }),
    [INITIAL_CHANNEL]: () => initialState,
  },
  initialState,
);

export default channel;
