import { takeLatest } from '@redux-saga/core/effects';
import { createAction, handleActions } from 'redux-actions';
import * as imageAPI from '../lib/api/image';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/util/createRequestSaga';

const [UPLOAD_IMAGES, UPLOAD_IMAGES_SUCCESS, UPLOAD_IMAGES_FAILURE] =
  createRequestActionTypes('images/UPLOAD_IMAGES');
const INITAILIZE = 'images/INITAILIZE';

export const uploadImages = createAction(UPLOAD_IMAGES, (files) => files);
export const initialize = createAction(INITAILIZE);

const uploadImagesSaga = createRequestSaga(
  UPLOAD_IMAGES,
  imageAPI.uploadImages,
);

export function* imageSaga() {
  yield takeLatest(UPLOAD_IMAGES, uploadImagesSaga);
}

const initialState = {
  images: [],
  error: null,
};

export default handleActions(
  {
    [UPLOAD_IMAGES_SUCCESS]: (state, { payload: images }) => ({
      ...state,
      images: Array(images),
    }),
    [UPLOAD_IMAGES_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [INITAILIZE]: (state) => initialState,
  },
  initialState,
);
