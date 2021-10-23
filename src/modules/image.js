import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender/lib/utils';
import * as imageAPI from '../lib/api/image';

const INIT_IMAGE = 'image/INIT_IMAGE';
const UPLOAD_PROFILE_IMAGE = 'image/UPLOAD_PROFILE_IMAGE';
const UPLOAD_IMAGE = 'image/UPLOAD_IMAGE';
const SET_PROFILE_IMAGE = 'image/SET_PROFILE_IMAGE';
const SET_IMAGE = 'image/SET_IMAGE';
const CONCAT_IMAGE = 'image/CONCAT_IMAGE';

export const initImage = createAction(INIT_IMAGE);
export const uploadProfileImage = createAction(UPLOAD_PROFILE_IMAGE, imageAPI.uploadImage);
export const uploadImage = createAction(UPLOAD_IMAGE, imageAPI.uploadImage);
export const setProfileImage = createAction(SET_PROFILE_IMAGE);
export const setImage = createAction(SET_IMAGE);
export const concatImage = createAction(CONCAT_IMAGE);

const initialState = {
  profileImage: null,
  images: [],
  error: null,
};

export default handleActions(
  {
    [INIT_IMAGE]: (state) => initialState,
    ...pender({
      type: UPLOAD_PROFILE_IMAGE,
      onSuccess: (state, { payload: profileImage }) => ({
        ...state,
        profileImage,
      }),
      onFailure: (state, { payload: error }) => ({
        ...state,
        error,
      }),
    }),
    ...pender({
      type: UPLOAD_IMAGE,
      onSuccess: (state, { payload: image }) => ({
        ...state,
        images: state.images.concat(image),
      }),
      onFailure: (state, { payload: error }) => ({
        ...state,
        error,
      }),
    }),
    [SET_PROFILE_IMAGE]: (state, { payload: profileImage }) => ({
      ...state,
      profileImage,
    }),
    [SET_IMAGE]: (state, { payload: images }) => ({
      ...state,
      images: [images],
    }),
    [CONCAT_IMAGE]: (state, { payload: image }) => ({
      ...state,
      images: state.images.concat(image),
    }),
  },
  initialState,
);
