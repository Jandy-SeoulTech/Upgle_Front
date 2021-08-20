import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as profileAPI from '../lib/api/profile';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/util/createRequestSaga';

const INITIALIZE_PROFILE = 'user/INITIALIZE_PROFILE';
const CHANGE_PROFILE = 'profile/CHANGE_PROFILE';
const [UPLOAD_PROFILE, UPLOAD_PROFILE_SUCCESS, UPLOAD_PROFILE_FAILURE] =
  createRequestActionTypes('profile/UPLOAD_PROFILE');

export const initialize = createAction(INITIALIZE_PROFILE, (mode) => mode);
export const changeField = createAction(
  CHANGE_PROFILE,
  ({ mode, key, value }) => ({
    mode,
    key,
    value,
  }),
);
export const uploadProfile = createAction(
  UPLOAD_PROFILE,
  ({ userId, department, introduce, welltalent, interesttalent, src }) => ({
    userId,
    department,
    introduce,
    welltalent,
    interesttalent,
    src,
  }),
);

const uploadProfileSaga = createRequestSaga(
  UPLOAD_PROFILE,
  profileAPI.uploadProfile,
);

export function* writeSaga() {
  yield takeLatest(UPLOAD_PROFILE, uploadProfileSaga);
}

const initialState = {
  profile: {
    department: '',
    introduce: null,
    welltalent: null,
    interesttalent: [],
    src: null,
  },
};

export default handleActions(
  {
    [CHANGE_PROFILE]: (state, { payload: { key, value } }) => ({
      ...state,
      profile: { ...state.profile, [key]: value },
    }),
    [INITIALIZE_PROFILE]: (state) => ({
      ...state,
      profile: initialState.profile,
    }),
    [UPLOAD_PROFILE_SUCCESS]: (state, { payload: profile }) => ({
      ...state,
      profile,
    }),
  },
  initialState,
);
