import { createAction, handleActions } from 'redux-actions';
import * as profileAPI from '../lib/api/profile';
import * as channelAPI from '../lib/api/channel';
import { pender } from 'redux-pender/lib/utils';

const INITIALIZE = 'write/INITIALIZE';
const CHANGE_PROFILE = 'write/CHANGE_PROFILE';
const CHANGE_CHANNEL = 'write/CHANGE_CHANNEL';
const SET_PROFILE = 'write/SET_PROFILE';
const SET_CHANNEL = 'write/SET_CHANNEL';
const UPLOAD_PROFILE = 'write/UPLOAD_PROFILE';
const UPDATE_PROFILE = 'write/UPDATE_PROFILE';
const CREATE_CHANNEL = 'write/CREATE_CHANNEL';

const UPDATE_CHANNEL = 'write/UPDATE_CHANNEL';

export const initialize = createAction(INITIALIZE);
export const changeProfile = createAction(CHANGE_PROFILE, ({ key, value }) => ({ key, value }));
export const changeChannel = createAction(CHANGE_CHANNEL, ({ key, value }) => ({ key, value }));
export const setProfile = createAction(SET_PROFILE, (profile) => profile);
export const uploadProfile = createAction(UPLOAD_PROFILE, profileAPI.uploadProfile);
export const updateProfile = createAction(UPDATE_PROFILE, profileAPI.updateProfile);
export const setChannel = createAction(SET_CHANNEL, (channel) => channel);
export const createChannel = createAction(CREATE_CHANNEL, channelAPI.createChannel);
export const updateChannel = createAction(UPDATE_CHANNEL, channelAPI.updateChannel);

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
    ...pender({
      type: UPLOAD_PROFILE,
      onSuccess: (state, { payload: profile }) => ({
        ...state,
        profile,
      }),
    }),
    ...pender({
      type: UPDATE_PROFILE,
      onSuccess: (state, { payload: profile }) => ({
        ...state,
        profile,
        updatedProfile: true,
      }),
      onFailure: (state, { payload: error }) => ({
        ...state,
        error,
        updatedProfile: false,
      }),
    }),
    ...pender({
      type: CREATE_CHANNEL,
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
      type: UPDATE_CHANNEL,
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
