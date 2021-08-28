import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/util/createRequestSaga';
import * as profileAPI from '../lib/api/profile';
import { takeLatest } from 'redux-saga/effects';

const [GET_FOLLOWINGS, GET_FOLLOWINGS_SUCCESS, GET_FOLLOWINGS_FAILURE] =
  createRequestActionTypes('profile/GET_FOLLOWINGS');
const [GET_FOLLOWERS, GET_FOLLOWERS_SUCCESS, GET_FOLLOWERS_FAILURE] =
  createRequestActionTypes('profile/GET_FOLLOWERS');
const [UNFOLLOW, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE] =
  createRequestActionTypes('profile/UNFOLLOW');
const [FOLLOW, FOLLOW_SUCCESS, FOLLOW_FAILURE] =
  createRequestActionTypes('profile/FOLLOW');
const [GET_PROFILE, GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE] =
  createRequestActionTypes('profile/GET_PROFILE');
const INIT_PROFILE = 'profile/INIT_PROFILE';

export const getFollowings = createAction(GET_FOLLOWINGS, ({ userId }) => ({
  userId,
}));
export const getFollowers = createAction(GET_FOLLOWERS, ({ userId }) => ({
  userId,
}));
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

const getFollowingsSaga = createRequestSaga(
  GET_FOLLOWINGS,
  profileAPI.getFollowings,
);
const getFollowersSaga = createRequestSaga(
  GET_FOLLOWERS,
  profileAPI.getFollowers,
);
const unfollowSaga = createRequestSaga(UNFOLLOW, profileAPI.unfollow);
const followSaga = createRequestSaga(FOLLOW, profileAPI.follow);
const getProfileSaga = createRequestSaga(GET_PROFILE, profileAPI.getProfile);

export function* profileSaga() {
  yield takeLatest(GET_FOLLOWINGS, getFollowingsSaga);
  yield takeLatest(GET_FOLLOWERS, getFollowersSaga);
  yield takeLatest(UNFOLLOW, unfollowSaga);
  yield takeLatest(FOLLOW, followSaga);
  yield takeLatest(GET_PROFILE, getProfileSaga);
}

const initialState = {
  followings: [],
  followers: [],
  profile: null,
  error: null,
};

const profile = handleActions(
  {
    [GET_FOLLOWINGS_SUCCESS]: (state, { payload: followings }) => ({
      ...state,
      followings,
    }),
    [GET_FOLLOWINGS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [GET_FOLLOWERS_SUCCESS]: (state, { payload: followers }) => ({
      ...state,
      followers,
    }),
    [GET_FOLLOWERS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
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
