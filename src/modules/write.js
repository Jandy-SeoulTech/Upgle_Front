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

export const initializeProfile = createAction(INITIALIZE_PROFILE);
export const changeField = createAction(CHANGE_PROFILE, ({ key, value }) => ({
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

const uploadProfileSaga = createRequestSaga(
  UPLOAD_PROFILE,
  profileAPI.uploadProfile,
);

export function* writeSaga() {
  yield takeLatest(UPLOAD_PROFILE, uploadProfileSaga);
}

const initialState = {
  writeProfile: {
    department: '',
    introduce: '',
    wellTalent: [],
    interestTalent: [],
  },
  profile: null,
  error: null,
};

export default handleActions(
  {
    [CHANGE_PROFILE]: (state, { payload: { key, value } }) => ({
      ...state,
      writeProfile: { ...state.writeProfile, [key]: value },
    }),
    [INITIALIZE_PROFILE]: (state) => ({
      ...state,
      profile: initialState.profile,
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
  },
  initialState,
);
