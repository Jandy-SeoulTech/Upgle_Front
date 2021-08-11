import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/util/createRequestSaga';
import * as authAPI from '../lib/api/auth';
import { takeLatest } from 'redux-saga/effects';

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
const INIT_AUTH = 'auth/INIT_AUTH';

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
export const initAuth = createAction(INIT_AUTH);

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
export function* authSaga() {
  yield takeLatest(CHECK_VERIFICATION_CODE, checkVerificationCodeSaga);
  yield takeLatest(SEND_VERIFICATION_CODE, sendVerificationCodeSaga);
  yield takeLatest(CHECK_EMAIL, checkEmailSaga);
  yield takeLatest(CHECK_NICKNAME, checkNicknameSaga);
  yield takeLatest(SIGNUP, signupSaga);
  yield takeLatest(SIGNIN, signinSaga);
}

const initialState = {
  auth: null,
  emailChecked: null,
  codeSent: null,
  codeVerified: null,
  nicknameChecked: null,
  signedUp: null,
  error: null,
};

const auth = handleActions(
  {
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
    [SIGNUP_SUCCESS]: (state) => ({
      ...state,
      signedUp: true,
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
    [INIT_AUTH]: () => initialState,
  },
  initialState,
);

export default auth;
