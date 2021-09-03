import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import * as profileAPI from '../lib/api/profile';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/util/createRequestSaga';

const [UNFOLLOW, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE] =
  createRequestActionTypes('user/UNFOLLOW');
const [FOLLOW, FOLLOW_SUCCESS, FOLLOW_FAILURE] =
  createRequestActionTypes('user/FOLLOW');
const SET_NICKNAME_STATE = 'user/SET_NICKNAME_STATE';
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] =
  createRequestActionTypes('user/CHECK');
const LOGOUT = 'user/LOGOUT';
const INITIAL_USER = 'user/INITIAL_USER';

export const unfollow = createAction(UNFOLLOW, ({ followingId }) => ({
  followingId,
}));
export const follow = createAction(FOLLOW, ({ followingId }) => ({
  followingId,
}));
export const setNicknameState = createAction(SET_NICKNAME_STATE);
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);
export const initialUser = createAction(INITIAL_USER);

const unfollowSaga = createRequestSaga(UNFOLLOW, profileAPI.unfollow);
const followSaga = createRequestSaga(FOLLOW, profileAPI.follow);
const checkSaga = createRequestSaga(CHECK, authAPI.check);
const logoutSaga = createRequestSaga(LOGOUT, authAPI.logout);

export function* userSaga() {
  yield takeLatest(UNFOLLOW, unfollowSaga);
  yield takeLatest(FOLLOW, followSaga);
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}

const initialState = {
  user: null,
  checkError: null,
  success: null,
};

export default handleActions(
  {
    [UNFOLLOW_SUCCESS]: (state, { payload: { followings } }) => ({
      ...state,
      user: {
        ...state.user,
        followings,
      },
    }),
    [UNFOLLOW_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [FOLLOW_SUCCESS]: (state, { payload: { followings } }) => ({
      ...state,
      user: {
        ...state.user,
        followings,
      },
    }),
    [FOLLOW_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [SET_NICKNAME_STATE]: (state, { payload: { nickname } }) => ({
      ...state,
      user: { ...state.user, nickname },
    }),
    [INITIAL_USER]: (state) => initialState,
    [CHECK]: (state) => ({
      ...state,
      success: false,
    }),
    [CHECK_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      checkError: null,
      success: true,
    }),
    [CHECK_FAILURE]: (state, { payload: checkError }) => ({
      ...state,
      user: null,
      checkError,
      success: true,
    }),
    [LOGOUT]: (state) => ({
      ...state,
      user: null,
    }),
  },
  initialState,
);
