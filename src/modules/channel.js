import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/util/createRequestSaga';
import * as channelAPI from '../lib/api/channel';
import { takeLatest } from 'redux-saga/effects';

const [GET_CHANNEL_DATA, GET_CHANNEL_DATA_SUCCESS, GET_CHANNEL_DATA_FAILURE] =
  createRequestActionTypes('channel/GET_CHANNEL_DATA');

export const getChannelData = createAction(GET_CHANNEL_DATA);

const getChannelDataSaga = createRequestSaga(
  GET_CHANNEL_DATA,
  channelAPI.getChannelData,
);

export function* channelSaga() {
  yield takeLatest(GET_CHANNEL_DATA, getChannelDataSaga);
}

const initialState = {
  channel: {
    id: 1,
  },
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
  },
  initialState,
);

export default posts;
