import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/util/createRequestSaga';
import * as channelAPI from '../lib/api/channel';
import { takeLatest } from 'redux-saga/effects';

const [GET_CHANNEL_DATA, GET_CHANNEL_DATA_SUCCESS, GET_CHANNEL_DATA_FAILURE] =
  createRequestActionTypes('channel/GET_CHANNEL_DATA');
const [GET_MYCHANNEL, GET_MYCHANNEL_SUCCESS, GET_MYCHANNEL_FAILURE] =
  createRequestActionTypes('channel/GET_MYCHANNEL');
const INITIAL_CHANNEL = 'channel/INITIAL_CHANNEL';

export const getChannelData = createAction(GET_CHANNEL_DATA, (id) => id);
export const getMychannel = createAction(GET_MYCHANNEL);
export const initailChannel = createAction(INITIAL_CHANNEL);

const getChannelDataSaga = createRequestSaga(
  GET_CHANNEL_DATA,
  channelAPI.getChannelData,
);
const getMychannelSaga = createRequestSaga(
  GET_MYCHANNEL,
  channelAPI.getMyChannel,
);

export function* channelSaga() {
  yield takeLatest(GET_CHANNEL_DATA, getChannelDataSaga);
  yield takeLatest(GET_MYCHANNEL, getMychannelSaga);
}

const initialState = {
  myChannel: null,
  channel: null,
  error: null,
};

const posts = handleActions(
  {
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
    [INITIAL_CHANNEL]: () => initialState,
  },
  initialState,
);

export default posts;
