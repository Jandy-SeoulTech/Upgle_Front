import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/util/createRequestSaga';
import * as authAPI from '../lib/api/auth';
import { takeLatest } from 'redux-saga/effects';

const [SET_NICKNAME, SET_NICKNAME_SUCCESS, SET_NICKNAME_FAILURE] =
  createRequestActionTypes('auth/SET_NICKNAME');
const NICKNAME_CHANGED = 'auth/NICKNAME_CHANGED';
const EMAIL_CHANGED = 'auth/EMAIL_CHANGED';
const [
  CHECK_VERIFICATION_CODE,
  CHECK_VERIFICATION_CODE_SUCCESS,
  CHECK_VERIFICATION_CODE_FAILURE,
] = createRequestActionTypes('auth/CHECK_VERIFICATION_CODE');
const [
  SEND_VERIFICATION_CODE,
  SEND_VERIFICATION_CODE_SUCCESS,
  SEND_VERIFICATION_CODE_FAILURE,
] = createRequestActionTypes('auth/SEND_VERIFICATION_CODE');
const [CHECK_EMAIL, CHECK_EMAIL_SUCCESS, CHECK_EMAIL_FAILURE] =
  createRequestActionTypes('auth/CHECK_EMAIL');
const [CHECK_NICKNAME, CHECK_NICKNAME_SUCCESS, CHECK_NICKNAME_FAILURE] =
  createRequestActionTypes('auth/CHECK_NICKNAME');
const [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE] =
  createRequestActionTypes('auth/SIGNUP');
const [SIGNIN, SIGNIN_SUCCESS, SIGNIN_FAILURE] =
  createRequestActionTypes('auth/LOGIN');
const [KAKAO_OAUTH, KAKAO_OAUTH_SUCCESS, KAKAO_OAUTH_FAILURE] =
  createRequestActionTypes('auth/KAKAO_OAUTH');
const [GOOGLE_OAUTH, GOOGLE_OAUTH_SUCCESS, GOOGLE_OAUTH_FAILURE] =
  createRequestActionTypes('auth/GOOGLE_OAUTH');
const [NAVER_OAUTH, NAVER_OAUTH_SUCCESS, NAVER_OAUTH_FAILURE] =
  createRequestActionTypes('auth/NAVER_OAUTH');
const INIT_AUTH = 'auth/INIT_AUTH';

export const setNickname = createAction(SET_NICKNAME, ({ nickname }) => ({
  nickname,
}));
export const nicknameChanged = createAction(NICKNAME_CHANGED);
export const emailChanged = createAction(EMAIL_CHANGED);
export const checkVerificationCode = createAction(
  CHECK_VERIFICATION_CODE,
  ({ email, code }) => ({
    email,
    auth: code,
  }),
);
export const sendVerificationCode = createAction(
  SEND_VERIFICATION_CODE,
  ({ email }) => ({
    email,
  }),
);
export const checkEmail = createAction(CHECK_EMAIL, ({ email }) => ({
  email,
}));
export const checkNickname = createAction(CHECK_NICKNAME, ({ nickname }) => ({
  nickname,
}));
export const signup = createAction(SIGNUP, ({ email, password, nickname }) => ({
  email,
  password,
  nickname,
}));
export const signin = createAction(SIGNIN, ({ email, password }) => ({
  email,
  password,
}));
export const kakaoOauth = createAction(KAKAO_OAUTH, (token) => token);
export const googleOauth = createAction(GOOGLE_OAUTH, (token) => token);
export const naverOauth = createAction(NAVER_OAUTH, (token) => token);
export const initAuth = createAction(INIT_AUTH);

const setNicknameSaga = createRequestSaga(SET_NICKNAME, authAPI.setNickname);
const checkVerificationCodeSaga = createRequestSaga(
  CHECK_VERIFICATION_CODE,
  authAPI.checkVerificationCode,
);
const sendVerificationCodeSaga = createRequestSaga(
  SEND_VERIFICATION_CODE,
  authAPI.sendVerificationCode,
);
const checkEmailSaga = createRequestSaga(CHECK_EMAIL, authAPI.checkEmail);
const checkNicknameSaga = createRequestSaga(
  CHECK_NICKNAME,
  authAPI.checkNickname,
);
const signupSaga = createRequestSaga(SIGNUP, authAPI.signup);
const signinSaga = createRequestSaga(SIGNIN, authAPI.signin);
const kakaoOauthSaga = createRequestSaga(KAKAO_OAUTH, authAPI.kakaoOauth);
const googleOauthSaga = createRequestSaga(GOOGLE_OAUTH, authAPI.googleOauth);
const naverOauthSaga = createRequestSaga(NAVER_OAUTH, authAPI.naverOauth);

export function* authSaga() {
  yield takeLatest(SET_NICKNAME, setNicknameSaga);
  yield takeLatest(CHECK_VERIFICATION_CODE, checkVerificationCodeSaga);
  yield takeLatest(SEND_VERIFICATION_CODE, sendVerificationCodeSaga);
  yield takeLatest(CHECK_EMAIL, checkEmailSaga);
  yield takeLatest(CHECK_NICKNAME, checkNicknameSaga);
  yield takeLatest(SIGNUP, signupSaga);
  yield takeLatest(SIGNIN, signinSaga);
  yield takeLatest(KAKAO_OAUTH, kakaoOauthSaga);
  yield takeLatest(GOOGLE_OAUTH, googleOauthSaga);
  yield takeLatest(NAVER_OAUTH, naverOauthSaga);
}

const initialState = {
  auth: null,
  emailChecked: null,
  codeSent: null,
  codeVerified: null,
  nicknameChecked: null,
  setNicknameSuccess: null,
  error: null,
};

const auth = handleActions(
  {
    [SET_NICKNAME_SUCCESS]: (state, { meta: { nickname } }) => ({
      ...state,
      setNicknameSuccess: nickname,
    }),
    [SET_NICKNAME_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [NICKNAME_CHANGED]: (state) => ({
      ...state,
      nicknameChecked: null,
    }),
    [EMAIL_CHANGED]: (state) => ({
      ...state,
      emailChecked: null,
    }),
    [CHECK_NICKNAME_SUCCESS]: (state) => ({
      ...state,
      nicknameChecked: true,
    }),
    [CHECK_NICKNAME_FAILURE]: (state) => ({
      ...state,
      nicknameChecked: false,
    }),
    [CHECK_VERIFICATION_CODE_SUCCESS]: (state) => ({
      ...state,
      codeVerified: true,
      codeSent: false,
    }),
    [CHECK_VERIFICATION_CODE_FAILURE]: (state) => ({
      ...state,
      codeVerified: false,
    }),
    [SEND_VERIFICATION_CODE_SUCCESS]: (state) => ({
      ...state,
      codeSent: true,
    }),
    [SEND_VERIFICATION_CODE_FAILURE]: (state) => ({
      ...state,
      codeSent: false,
    }),
    [CHECK_EMAIL_SUCCESS]: (state) => ({
      ...state,
      emailChecked: true,
    }),
    [CHECK_EMAIL_FAILURE]: (state) => ({
      ...state,
      emailChecked: false,
    }),
    [SIGNUP_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      auth,
    }),
    [SIGNUP_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
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

export default auth;
