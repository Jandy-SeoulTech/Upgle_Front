import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/util/createRequestSaga';
import * as authAPI from '../lib/api/auth';
import { takeLatest } from 'redux-saga/effects';

const [SIGNIN, SIGNIN_SUCCESS, SIGNIN_FAILURE] =
  createRequestActionTypes('auth/LOGIN');
const [KAKAO_OAUTH, KAKAO_OAUTH_SUCCESS, KAKAO_OAUTH_FAILURE] =
  createRequestActionTypes('auth/KAKAO_OAUTH');
const [GOOGLE_OAUTH, GOOGLE_OAUTH_SUCCESS, GOOGLE_OAUTH_FAILURE] =
  createRequestActionTypes('auth/GOOGLE_OAUTH');
const [NAVER_OAUTH, NAVER_OAUTH_SUCCESS, NAVER_OAUTH_FAILURE] =
  createRequestActionTypes('auth/NAVER_OAUTH');
const INIT_AUTH = 'auth/INIT_AUTH';

export const signin = createAction(SIGNIN, ({ email, password }) => ({
  email,
  password,
}));
export const kakaoOauth = createAction(KAKAO_OAUTH, (token) => token);
export const googleOauth = createAction(GOOGLE_OAUTH, (token) => token);
export const naverOauth = createAction(NAVER_OAUTH, (token) => token);
export const initAuth = createAction(INIT_AUTH);

const signinSaga = createRequestSaga(SIGNIN, authAPI.signin);
const kakaoOauthSaga = createRequestSaga(KAKAO_OAUTH, authAPI.kakaoOauth);
const googleOauthSaga = createRequestSaga(GOOGLE_OAUTH, authAPI.googleOauth);
const naverOauthSaga = createRequestSaga(NAVER_OAUTH, authAPI.naverOauth);

export function* authSaga() {
  yield takeLatest(SIGNIN, signinSaga);
  yield takeLatest(KAKAO_OAUTH, kakaoOauthSaga);
  yield takeLatest(GOOGLE_OAUTH, googleOauthSaga);
  yield takeLatest(NAVER_OAUTH, naverOauthSaga);
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
    [KAKAO_OAUTH_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      auth,
    }),
    [KAKAO_OAUTH_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [GOOGLE_OAUTH_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      auth,
    }),
    [GOOGLE_OAUTH_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [NAVER_OAUTH_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      auth,
    }),
    [NAVER_OAUTH_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [INIT_AUTH]: () => initialState,
  },
  initialState,
);

export default posts;
