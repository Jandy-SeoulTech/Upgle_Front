import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as profileAPI from '../lib/api/profile';
import * as channelAPI from '../lib/api/channel';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/util/createRequestSaga';

const INITIALIZE_WRITE = 'user/INITIALIZE_WRITE';
const CHANGE_PROFILE = 'profile/CHANGE_PROFILE';
const CHANGE_CHANNEL = 'profile/CHANGE_CHANNEL';
const [UPLOAD_PROFILE, UPLOAD_PROFILE_SUCCESS, UPLOAD_PROFILE_FAILURE] =
  createRequestActionTypes('profile/UPLOAD_PROFILE');
const [CREATE_CHANNEL, CREATE_CHANNEL_SUCCESS, CREATE_CHANNEL_FAILURE] =
  createRequestActionTypes('profile/CREATE_CHANNEL');

export const initializeWrite = createAction(INITIALIZE_WRITE);
export const changeProfile = createAction(CHANGE_PROFILE, ({ key, value }) => ({
  key,
  value,
}));
export const changeChannel = createAction(CHANGE_CHANNEL, ({ key, value }) => ({
  key,
  value,
}));
export const uploadProfile = createAction(
  UPLOAD_PROFILE,
  ({ userId, department, introduce, wellTalent, interestTalent, src }) => ({
    userId,
    department,
    introduce,
    wellTalent,
    interestTalent,
    src,
  }),
);

export const createChannel = createAction(
  CREATE_CHANNEL,
  ({ userId, channelId, name, introduce, tag, category, src }) => ({
    userId,
    channelId,
    name,
    introduce,
    tag,
    category,
    src,
  }),
);

const uploadProfileSaga = createRequestSaga(
  UPLOAD_PROFILE,
  profileAPI.uploadProfile,
);
const createChannelSaga = createRequestSaga(
  CREATE_CHANNEL,
  channelAPI.createChannel,
);

export function* writeSaga() {
  yield takeLatest(UPLOAD_PROFILE, uploadProfileSaga);
  yield takeLatest(CREATE_CHANNEL, createChannelSaga);
}

const initialState = {
  writeProfile: {
    id: null,
    department: '',
    introduce: '',
    wellTalent: [],
    interestTalent: [],
  },
  writeChannel: {
    id: null,
    name: '',
    introduce: '',
    category: '',
    tag: [],
    src: '',
  },
  profile: null,
  channel: null,
  error: null,
};

export default handleActions(
  {
    [INITIALIZE_WRITE]: () => initialState,
    [CHANGE_PROFILE]: (state, { payload: { key, value } }) => ({
      ...state,
      writeProfile: { ...state.writeProfile, [key]: value },
    }),
    [CHANGE_CHANNEL]: (state, { payload: { key, value } }) => ({
      ...state,
      writeChannel: { ...state.writeChannel, [key]: value },
    }),
    [UPLOAD_PROFILE]: (state) => ({
      ...state,
      error: null,
    }),
    [UPLOAD_PROFILE_SUCCESS]: (state, { payload: profile }) => ({
      ...state,
      profile,
    }),
    [UPLOAD_PROFILE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [CREATE_CHANNEL_SUCCESS]: (state, { payload: channel }) => ({
      ...state,
      channel,
    }),
    [CREATE_CHANNEL_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);
