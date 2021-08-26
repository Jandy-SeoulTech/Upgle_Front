import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/util/createRequestSaga';
import * as profileAPI from '../lib/api/profile';
import { takeLatest } from 'redux-saga/effects';

const [GET_PROFILE, GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE] =
  createRequestActionTypes('profile/GET_PROFILE');
const INIT_PROFILE = 'profile/INIT_PROFILE';

export const getProfile = createAction(GET_PROFILE, ({ userId }) => ({
  userId,
}));
export const initProfile = createAction(INIT_PROFILE);

const getProfileSaga = createRequestSaga(GET_PROFILE, profileAPI.getProfile);

export function* profileSaga() {
  yield takeLatest(GET_PROFILE, getProfileSaga);
}

const initialState = {
  profile: null,
  error: null,
};

const profile = handleActions(
  {
    [GET_PROFILE_SUCCESS]: (state, { payload: profile }) => ({
      ...state,
      profile,
    }),
    [GET_PROFILE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [INIT_PROFILE]: () => initialState,
  },
  initialState,
);

export default profile;
