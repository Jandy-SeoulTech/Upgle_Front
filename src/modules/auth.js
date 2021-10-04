import { createAction, handleActions } from 'redux-actions';
import * as authAPI from '../lib/api/auth';
import { pender } from 'redux-pender';

const SET_NICKNAME = 'auth/SET_NICKNAME';
const NICKNAME_CHANGED = 'auth/NICKNAME_CHANGED';
const EMAIL_CHANGED = 'auth/EMAIL_CHANGED';
const CHECK_VERIFICATION_CODE = 'auth/CHECK_VERIFICATION_CODE';
const SEND_VERIFICATION_CODE = 'auth/SEND_VERIFICATION_CODE';
const CHECK_EMAIL = 'auth/CHECK_EMAIL';
const CHECK_NICKNAME = 'auth/CHECK_NICKNAME';
const SIGNUP = 'auth/SIGNUP';
const SIGNIN = 'auth/LOGIN';
const SET_SIGNIN_ERROR = 'auth/SET_SIGNIN_ERROR';
const KAKAO_OAUTH = 'auth/KAKAO_OAUTH';
const GOOGLE_OAUTH = 'auth/GOOGLE_OAUTH';
const NAVER_OAUTH = 'auth/NAVER_OAUTH';
const INIT_AUTH = 'auth/INIT_AUTH';

export const setNickname = createAction(SET_NICKNAME, authAPI.setNickname);
export const nicknameChanged = createAction(NICKNAME_CHANGED);
export const emailChanged = createAction(EMAIL_CHANGED);
export const checkVerificationCode = createAction(
  CHECK_VERIFICATION_CODE,
  authAPI.checkVerificationCode,
);
export const sendVerificationCode = createAction(
  SEND_VERIFICATION_CODE,
  authAPI.sendVerificationCode,
);
export const checkEmail = createAction(CHECK_EMAIL, authAPI.checkEmail);
export const checkNickname = createAction(CHECK_NICKNAME, authAPI.checkNickname);
export const signup = createAction(SIGNUP, authAPI.signup);
export const signin = createAction(SIGNIN, authAPI.signin);
export const setSigninError = createAction(SET_SIGNIN_ERROR, (message) => message);
export const kakaoOauth = createAction(KAKAO_OAUTH, authAPI.kakaoOauth, (token) => token);
export const googleOauth = createAction(GOOGLE_OAUTH, authAPI.googleOauth, (token) => token);
export const naverOauth = createAction(NAVER_OAUTH, authAPI.naverOauth, (token) => token);
export const initAuth = createAction(INIT_AUTH);

const initialState = {
  auth: null,
  signinError: null,
  emailChecked: null,
  codeSent: null,
  codeVerified: null,
  nicknameChecked: null,
  error: null,
};

export default handleActions(
  {
    [NICKNAME_CHANGED]: (state) => ({
      ...state,
      nicknameChecked: null,
    }),
    [EMAIL_CHANGED]: (state) => ({
      ...state,
      emailChecked: null,
    }),
    [SET_SIGNIN_ERROR]: (state, { payload: messgae }) => ({
      ...state,
      signinError: messgae,
    }),
    [INIT_AUTH]: () => initialState,
    ...pender({
      type: SET_NICKNAME,
    }),
    ...pender({
      type: CHECK_NICKNAME,
      onSuccess: (state) => ({
        ...state,
        nicknameChecked: true,
      }),
      onFailure: (state) => ({
        ...state,
        nicknameChecked: false,
      }),
    }),
    ...pender({
      type: CHECK_VERIFICATION_CODE,
      onSuccess: (state) => ({
        ...state,
        codeVerified: true,
        codeSent: false,
      }),
      onFailure: (state) => ({
        ...state,
        codeVerified: false,
      }),
    }),
    ...pender({
      type: SEND_VERIFICATION_CODE,
      onSuccess: (state) => ({
        ...state,
        codeSent: true,
      }),
      onFailure: (state) => ({
        ...state,
        codeSent: false,
      }),
    }),
    ...pender({
      type: CHECK_EMAIL,
      onSuccess: (state) => ({
        ...state,
        emailChecked: true,
      }),
      onFailure: (state) => ({
        ...state,
        emailChecked: false,
      }),
    }),
    ...pender({
      type: SIGNUP,
      onSuccess: (state, { payload: auth }) => ({
        ...state,
        auth,
      }),
    }),
    ...pender({
      type: SIGNIN,
      onSuccess: (state, { payload: auth }) => ({
        ...state,
        auth,
      }),
      onFailure: (state) => ({
        ...state,
        signinError: '로그인에 실패했습니다.',
      }),
    }),
    ...pender({
      type: KAKAO_OAUTH,
      onSuccess: (state, { payload: auth }) => ({
        ...state,
        auth,
      }),
      onFailure: (state) => ({
        ...state,
        signinError: '소셜 로그인에 실패했습니다.',
      }),
    }),
    ...pender({
      type: GOOGLE_OAUTH,
      onSuccess: (state, { payload: auth }) => ({
        ...state,
        auth,
      }),
      onFailure: (state) => ({
        ...state,
        signinError: '소셜 로그인에 실패했습니다.',
      }),
    }),
    ...pender({
      type: NAVER_OAUTH,
      onSuccess: (state, { payload: auth }) => ({
        ...state,
        auth,
      }),
      onFailure: (state) => ({
        ...state,
        signinError: '소셜 로그인에 실패했습니다.',
      }),
    }),
  },
  initialState,
);
