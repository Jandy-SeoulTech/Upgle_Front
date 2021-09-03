import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as profileAPI from '../lib/api/profile';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/util/createRequestSaga';

const INITIALIZE_WRITE = 'user/INITIALIZE_WRITE';
const CHANGE_PROFILE = 'profile/CHANGE_PROFILE';
const [UPLOAD_PROFILE, UPLOAD_PROFILE_SUCCESS, UPLOAD_PROFILE_FAILURE] =
  createRequestActionTypes('profile/UPLOAD_PROFILE');

export const initializeWrite = createAction(INITIALIZE_WRITE);
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
    tag: '',
    src: '',
  },
  profile: null,
  error: null,
};

export default handleActions(
  {
    [INITIALIZE_WRITE]: () => initialState,
    [CHANGE_PROFILE]: (state, { payload: { key, value } }) => ({
      ...state,
      writeProfile: { ...state.writeProfile, [key]: value },
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
