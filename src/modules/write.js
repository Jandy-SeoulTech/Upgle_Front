import { createAction, handleActions } from 'redux-actions';
import * as profileAPI from '../lib/api/profile';
import * as channelAPI from '../lib/api/channel';
import * as postAPI from '../lib/api/post';
import * as archiveAPI from '../lib/api/archive';
import { pender } from 'redux-pender/lib/utils';

const SET_PROFILE = 'write/SET_PROFILE';
const CHANGE_PROFILE = 'write/CHANGE_PROFILE';
const UPLOAD_PROFILE = 'write/UPLOAD_PROFILE';
const UPDATE_PROFILE = 'write/UPDATE_PROFILE';

const SET_CHANNEL = 'write/SET_CHANNEL';
const CHANGE_CHANNEL = 'write/CHANGE_CHANNEL';
const CREATE_CHANNEL = 'write/CREATE_CHANNEL';
const UPDATE_CHANNEL = 'write/UPDATE_CHANNEL';

const SET_POST = 'write/SET_POST';
const CHANGE_POST = 'write/CHANGE_POST';
const CREATE_POST = 'write/CREATE_POST';
const UPDATE_POST = 'write/UPDATE_POST';

const SET_ARCHIVE = 'write/SET_ARCHIVE';
const CHANGE_ARCHIVE = 'write/CHANGE_ARCHIVE';
const WRITE_ARCHIVE = 'write/WRITE_ARCHIVE';
const EDIT_ARCHIVE = 'write/EDIT_ARCHIVE';

const INITIALIZE = 'write/INITIALIZE';

export const setProfile = createAction(SET_PROFILE, (profile) => profile);
export const changeProfile = createAction(CHANGE_PROFILE, ({ key, value }) => ({ key, value }));
export const uploadProfile = createAction(UPLOAD_PROFILE, profileAPI.uploadProfile);
export const updateProfile = createAction(UPDATE_PROFILE, profileAPI.updateProfile);

export const setChannel = createAction(SET_CHANNEL, (channel) => channel);
export const changeChannel = createAction(CHANGE_CHANNEL, ({ key, value }) => ({ key, value }));
export const createChannel = createAction(CREATE_CHANNEL, channelAPI.createChannel);
export const updateChannel = createAction(UPDATE_CHANNEL, channelAPI.updateChannel);

export const setPost = createAction(SET_POST, (post) => post);
export const changePost = createAction(CHANGE_POST, ({ key, value }) => ({ key, value }));
export const createPost = createAction(CREATE_POST, postAPI.writePost);
export const updatePost = createAction(UPDATE_POST, postAPI.editPost);

export const setArchive = createAction(SET_ARCHIVE, (archive) => archive);
export const changeArchive = createAction(CHANGE_ARCHIVE, ({ key, value }) => ({ key, value }));
export const createArchive = createAction(WRITE_ARCHIVE, archiveAPI.writeArchive);
export const editArchive = createAction(EDIT_ARCHIVE, archiveAPI.editArchive);

export const initialize = createAction(INITIALIZE);

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
  writePost: {
    postId: null,
    channelId: null,
    title: '',
    status: 'Close',
    content: '',
    images: null,
  },
  writeArchive: {
    archiveId: null,
    channelId: null,
    postId: null,
    title: null,
    status: 'Public',
    content: '',
    tags: [],
    images: null,
  },
  updatedProfile: null,
  error: null,
};

export default handleActions(
  {
    [SET_PROFILE]: (state, { payload }) => ({
      ...state,
      writeProfile: {
        id: payload.id,
        name: payload.name,
        introduce: payload.introduce,
        tags: payload.tags.map((tag) => tag.tag.name),
        category: payload.category.category.name,
        src: payload.channelImage,
      },
    }),
    [CHANGE_PROFILE]: (state, { payload: { key, value } }) => ({
      ...state,
      writeProfile: { ...state.writeProfile, [key]: value },
    }),

    [SET_CHANNEL]: (state, { payload }) => ({
      ...state,
      writeChannel: {
        id: payload.id,
        name: payload.name,
        introduce: payload.introduce,
        tags: payload.tags.map((tag) => tag.tag.name),
        category: payload.category.category.name,
        src: payload.channelImage,
      },
    }),
    [CHANGE_CHANNEL]: (state, { payload: { key, value } }) => ({
      ...state,
      writeChannel: { ...state.writeChannel, [key]: value },
    }),

    [SET_POST]: (state, { payload }) => ({
      ...state,
      writePost: {
        postId: payload.id,
        channelId: payload.channelId,
        title: payload.title,
        status: payload.status,
        content: payload.content,
        images: payload.images,
      },
    }),
    [CHANGE_POST]: (state, { payload: { key, value } }) => ({
      ...state,
      writePost: { ...state.writePost, [key]: value },
    }),

    [SET_ARCHIVE]: (state, { payload }) => ({
      ...state,
      writeArchive: {
        archiveId: payload?.id,
        channelId: payload.channelId,
        postId: payload.postId,
        title: payload.title,
        status: payload.status,
        content: payload.content,
        tags: payload.tags.map((tag) => tag.tag.name),
        images: payload.images,
      },
    }),
    [CHANGE_ARCHIVE]: (state, { payload: { key, value } }) => ({
      ...state,
      writeArchive: { ...state.writeArchive, [key]: value },
    }),

    [INITIALIZE]: () => initialState,
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
  },
  initialState,
);
