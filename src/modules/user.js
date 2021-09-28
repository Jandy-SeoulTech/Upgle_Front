import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender/lib/utils';
import * as authAPI from '../lib/api/auth';
import * as profileAPI from '../lib/api/profile';

const UNFOLLOW = 'user/UNFOLLOW';
const FOLLOW = 'user/FOLLOW';
const SET_NICKNAME_STATE = 'user/SET_NICKNAME_STATE';
const CHECK = 'user/CHECK';
const LOGOUT = 'user/LOGOUT';
const INITIAL_USER = 'user/INITIAL_USER';

export const unfollow = createAction(UNFOLLOW, profileAPI.unfollow);
export const follow = createAction(FOLLOW, profileAPI.follow);
export const check = createAction(CHECK, authAPI.check);
export const logout = createAction(LOGOUT, authAPI.logout);
export const setNicknameState = createAction(SET_NICKNAME_STATE);
export const initialUser = createAction(INITIAL_USER);

const initialState = {
  user: null,
  checkError: null,
  success: null,
  error: null,
};

export default handleActions(
  {
    [SET_NICKNAME_STATE]: (state, { payload: { nickname } }) => ({
      ...state,
      user: { ...state.user, nickname },
    }),
    [INITIAL_USER]: (state) => initialState,
    [CHECK]: (state) => ({
      ...state,
      success: false,
    }),
    ...pender({
      type: LOGOUT,
      onPending: (state) => ({
        ...state,
        user: null,
      }),
    }),
    ...pender({
      type: UNFOLLOW,
      onSuccess: (state, { payload: { followings } }) => ({
        ...state,
        user: {
          ...state.user,
          followings,
        },
      }),
      onFailure: (state, { payload: error }) => ({
        ...state,
        error,
      }),
    }),
    ...pender({
      type: FOLLOW,
      onSuccess: (state, { payload: { followings } }) => ({
        ...state,
        user: {
          ...state.user,
          followings,
        },
      }),
      onFailure: (state, { payload: error }) => ({
        ...state,
        error,
      }),
    }),
    ...pender({
      type: CHECK,
      onSuccess: (state, { payload: user }) => ({
        ...state,
        user,
        checkError: null,
        success: true,
      }),
      onFailure: (state, { payload: checkError }) => ({
        ...state,
        user: null,
        checkError,
      }),
    }),
  },
  initialState,
);
