import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender/lib/utils';
import * as imageAPI from '../lib/api/image';

const UPLOAD_IMAGES = 'images/UPLOAD_IMAGES';
const INITAILIZE = 'images/INITAILIZE';
const CONCAT_IMAGE = 'images/CONCAT_IMAGE';
const SET_IMAGE = 'images/SET_IMAGE';

export const uploadImages = createAction(UPLOAD_IMAGES, imageAPI.uploadImages);
export const initialize = createAction(INITAILIZE);
export const concatImage = createAction(CONCAT_IMAGE);
export const setImage = createAction(SET_IMAGE);

const initialState = {
  images: [],
  error: null,
};

export default handleActions(
  {
    [CONCAT_IMAGE]: (state, { payload: image }) => ({
      ...state,
      images: state.images.concat(image),
    }),
    [SET_IMAGE]: (state, { payload: image }) => ({
      ...state,
      images: [image],
    }),
    [INITAILIZE]: (state) => initialState,
    ...pender({
      type: UPLOAD_IMAGES,
      onSuccess: (state, { payload: images }) => ({
        ...state,
        images: state.images.concat(images),
      }),
      onFailure: (state, { payload: error }) => ({
        ...state,
        error,
      }),
    }),
  },
  initialState,
);
