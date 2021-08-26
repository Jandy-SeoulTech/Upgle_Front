import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/util/createRequestSaga';
import * as channelAPI from '../lib/api/channel';
import { takeLatest } from 'redux-saga/effects';

const [GET_CHANNEL_LIST, GET_CHANNEL_LIST_SUCCESS, GET_CHANNEL_LIST_FAILURE] =
  createRequestActionTypes('channels/GET_CHANNEL_LIST');

export const getChannelList = createAction(GET_CHANNEL_LIST);

const getChannelListSaga = createRequestSaga(
  GET_CHANNEL_LIST,
  channelAPI.getChannelData,
);

export function* channelsSaga() {
  yield takeLatest(GET_CHANNEL_LIST, getChannelListSaga);
}

const initialState = {
  channels: null,
  error: null,
};

const posts = handleActions(
  {
    [GET_CHANNEL_LIST_SUCCESS]: (state, { payload: channels }) => ({
      ...state,
      channels,
    }),
    [GET_CHANNEL_LIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default posts;
