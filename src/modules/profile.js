import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/util/createRequestSaga';
import * as profileAPI from '../lib/api/profile';
import { takeLatest } from 'redux-saga/effects';

const [UNFOLLOW, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE] =
  createRequestActionTypes('profile/UNFOLLOW');
const [FOLLOW, FOLLOW_SUCCESS, FOLLOW_FAILURE] =
  createRequestActionTypes('profile/FOLLOW');
const [GET_PROFILE, GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE] =
  createRequestActionTypes('profile/GET_PROFILE');
const INIT_PROFILE = 'profile/INIT_PROFILE';

export const unfollow = createAction(UNFOLLOW, ({ followingId }) => ({
  followingId,
}));
export const follow = createAction(FOLLOW, ({ followingId }) => ({
  followingId,
}));
export const getProfile = createAction(GET_PROFILE, ({ userId }) => ({
  userId,
}));
export const initProfile = createAction(INIT_PROFILE);

const unfollowSaga = createRequestSaga(UNFOLLOW, profileAPI.unfollow);
const followSaga = createRequestSaga(FOLLOW, profileAPI.follow);
const getProfileSaga = createRequestSaga(GET_PROFILE, profileAPI.getProfile);

export function* profileSaga() {
  yield takeLatest(UNFOLLOW, unfollowSaga);
  yield takeLatest(FOLLOW, followSaga);
  yield takeLatest(GET_PROFILE, getProfileSaga);
}

const initialState = {
  profile: null,
  error: null,
};

const profile = handleActions(
  {
    [UNFOLLOW_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      profile: {
        ...state.profile,
        followers: state.profile.followers.filter(
          (el) => el.followerId !== user.id,
        ),
      },
    }),
    [UNFOLLOW_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [FOLLOW_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      profile: {
        ...state.profile,
        followers: state.profile.followers.concat([{ followerId: user.id }]),
      },
    }),
    [FOLLOW_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
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
