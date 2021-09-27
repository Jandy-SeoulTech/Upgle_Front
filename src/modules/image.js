import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender/lib/utils';
import * as imageAPI from '../lib/api/image';

const UPLOAD_IMAGES = 'images/UPLOAD_IMAGES';
const INITAILIZE = 'images/INITAILIZE';
const SET_IMAGE = 'images/SET_IMAGE';

export const uploadImages = createAction(UPLOAD_IMAGES, imageAPI.uploadImages, (files) => files);
export const initialize = createAction(INITAILIZE);
export const setImage = createAction(SET_IMAGE);

const initialState = {
  images: [],
  error: null,
};

export default handleActions(
  {
    [SET_IMAGE]: (state, { payload: image }) => ({
      ...state,
      images: [image],
    }),
    [INITAILIZE]: (state) => initialState,
    ...pender({
      type: UPLOAD_IMAGES,
      onSuccess: (state, { payload: images }) => ({
        ...state,
        images: Array(images),
      }),
      onFailure: (state, { payload: error }) => ({
        ...state,
        error,
      }),
    }),
  },
  initialState,
);
