import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/util/createRequestSaga';
import * as authAPI from '../lib/api/auth';
import { takeLatest } from 'redux-saga/effects';

const [SIGNIN, SIGNIN_SUCCESS, SIGNIN_FAILURE] =
  createRequestActionTypes('auth/LOGIN');
const [OAUTH_KAKAO, OAUTH_KAKAO_SUCCESS, OAUTH_KAKAO_FAILURE] =
  createRequestActionTypes('auth/OAUTH_KAKAO');
const [OAUTH_GOOGLE, OAUTH_GOOGLE_SUCCESS, OAUTH_GOOGLE_FAILURE] =
  createRequestActionTypes('auth/OAUTH_GOOGLE');
const INIT_AUTH = 'auth/INIT_AUTH';

export const signin = createAction(SIGNIN, ({ email, password }) => ({
  email,
  password,
}));
export const oauthKakao = createAction(OAUTH_KAKAO, (token) => token);
export const oauthGoogle = createAction(OAUTH_GOOGLE, (token) => token);
export const initAuth = createAction(INIT_AUTH);

const signinSaga = createRequestSaga(SIGNIN, authAPI.signin);
const oauthKakaoSaga = createRequestSaga(OAUTH_KAKAO, authAPI.oauthKakao);
const oauthGoogleSaga = createRequestSaga(OAUTH_GOOGLE, authAPI.oauthGoogle);

export function* authSaga() {
  yield takeLatest(SIGNIN, signinSaga);
  yield takeLatest(OAUTH_KAKAO, oauthKakaoSaga);
  yield takeLatest(OAUTH_GOOGLE, oauthGoogleSaga);
}

const initialState = {
  auth: null,
  error: null,
};

const posts = handleActions(
  {
    [SIGNIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      auth,
    }),
    [SIGNIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [OAUTH_KAKAO_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      auth,
    }),
    [OAUTH_KAKAO_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [INIT_AUTH]: () => initialState,
  },
  initialState,
);

export default posts;
