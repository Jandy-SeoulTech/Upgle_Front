import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as profileAPI from '../lib/api/profile';
import * as channelAPI from '../lib/api/channel';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/util/createRequestSaga';

const INITIALIZE = 'write/INITIALIZE';
const CHANGE_PROFILE = 'write/CHANGE_PROFILE';
const CHANGE_CHANNEL = 'write/CHANGE_CHANNEL';
const SET_PROFILE = 'write/SET_PROFILE';
const SET_CHANNEL = 'write/SET_CHANNEL';
const [UPLOAD_PROFILE, UPLOAD_PROFILE_SUCCESS, UPLOAD_PROFILE_FAILURE] =
  createRequestActionTypes('write/UPLOAD_PROFILE');
const [UPDATE_PROFILE, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE] =
  createRequestActionTypes('write/UPDATE_PROFILE');
const [CREATE_CHANNEL, CREATE_CHANNEL_SUCCESS, CREATE_CHANNEL_FAILURE] =
  createRequestActionTypes('write/CREATE_CHANNEL');

const [UPDATE_CHANNEL, UPDATE_CHANNEL_SUCCESS, UPDATE_CHANNEL_FAILURE] =
  createRequestActionTypes('write/UPDATE_CHANNEL');

export const initialize = createAction(INITIALIZE);
export const changeProfile = createAction(CHANGE_PROFILE, ({ key, value }) => ({
  key,
  value,
}));
export const changeChannel = createAction(CHANGE_CHANNEL, ({ key, value }) => ({
  key,
  value,
}));
export const setProfile = createAction(SET_PROFILE, (profile) => profile);
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
export const updateProfile = createAction(
  UPDATE_PROFILE,
  ({
    userId,
    nickname,
    department,
    introduce,
    wellTalent,
    interestTalent,
    src,
  }) => ({
    userId,
    nickname,
    department,
    introduce,
    wellTalent,
    interestTalent,
    src,
  }),
);
export const setChannel = createAction(SET_CHANNEL, (channel) => channel);
export const createChannel = createAction(
  CREATE_CHANNEL,
  ({ userId, channelId, name, introduce, tags, category, src }) => ({
    userId,
    channelId,
    name,
    introduce,
    tags,
    category,
    src,
  }),
);
export const updateChannel = createAction(
  UPDATE_CHANNEL,
  ({ userId, channelId, name, introduce, tags, category, src }) => ({
    userId,
    channelId,
    name,
    introduce,
    tags,
    category,
    src,
  }),
);

const uploadProfileSaga = createRequestSaga(
  UPLOAD_PROFILE,
  profileAPI.uploadProfile,
);
const updateProfileSaga = createRequestSaga(
  UPDATE_PROFILE,
  profileAPI.updateProfile,
);
const createChannelSaga = createRequestSaga(
  CREATE_CHANNEL,
  channelAPI.createChannel,
);
const updateChannelSaga = createRequestSaga(
  UPDATE_CHANNEL,
  channelAPI.updateChannel,
);

export function* writeSaga() {
  yield takeLatest(UPLOAD_PROFILE, uploadProfileSaga);
  yield takeLatest(UPDATE_PROFILE, updateProfileSaga);
  yield takeLatest(CREATE_CHANNEL, createChannelSaga);
  yield takeLatest(UPDATE_CHANNEL, updateChannelSaga);
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
    tags: [],
    src: '',
  },
  profile: null,
  channel: null,
  updatedProfile: null,
  error: null,
};

export default handleActions(
  {
    [INITIALIZE]: () => initialState,
    [CHANGE_PROFILE]: (state, { payload: { key, value } }) => ({
      ...state,
      writeProfile: { ...state.writeProfile, [key]: value },
    }),
    [SET_PROFILE]: (state, { payload }) => ({
      ...state,
      writeProfile: {
        id: payload.id,
        name: payload.name,
        introduce: payload.introduce,
        tags: payload.tags.map((tag) => tag.tag.name),
        category: payload.category.category.name,
        src: payload.channelImage.src,
      },
    }),
    [CHANGE_CHANNEL]: (state, { payload: { key, value } }) => ({
      ...state,
      writeChannel: { ...state.writeChannel, [key]: value },
    }),
    [SET_CHANNEL]: (state, { payload }) => ({
      ...state,
      writeChannel: {
        id: payload.id,
        name: payload.name,
        introduce: payload.introduce,
        tags: payload.tags.map((tag) => tag.tag.name),
        category: payload.category.category.name,
        src: payload.channelImage.src,
      },
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
    [UPDATE_PROFILE_SUCCESS]: (state, { payload: profile }) => ({
      ...state,
      profile,
      updatedProfile: true,
    }),
    [UPDATE_PROFILE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
      updatedProfile: false,
    }),
    [CREATE_CHANNEL_SUCCESS]: (state, { payload: channel }) => ({
      ...state,
      channel,
    }),
    [CREATE_CHANNEL_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UPDATE_CHANNEL_SUCCESS]: (state, { payload: channel }) => ({
      ...state,
      channel,
    }),
    [UPDATE_CHANNEL_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);
