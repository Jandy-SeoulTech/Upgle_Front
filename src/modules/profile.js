import { createAction, handleActions } from 'redux-actions';
import * as profileAPI from '../lib/api/profile';
import * as roomAPI from '../lib/api/room';
import { pender } from 'redux-pender';

const CHANGE_PASSWORD = 'profile/CHANGE_PASSWORD';
const CHECK_PASSWORD = 'profile/CHECK_PASSWORD';
const GET_REVIEWS = 'profile/GET_REVIEWS';
const GET_FOLLOWINGS = 'profile/GET_FOLLOWINGS';
const GET_FOLLOWERS = 'profile/GET_FOLLOWERS';
const PROFILE_UNFOLLOW = 'profile/UNFOLLOW';
const PROFILE_FOLLOW = 'profile/FOLLOW';
const GET_PROFILE = 'profile/GET_PROFILE';
const INIT_PROFILE = 'profile/INIT_PROFILE';

export const profileUnfollow = createAction(PROFILE_UNFOLLOW, ({ followingId, isMe }) => ({
  followingId,
  isMe,
}));
export const profileFollow = createAction(PROFILE_FOLLOW, ({ followingId, isMe }) => ({
  followingId,
  isMe,
}));
export const changePassword = createAction(CHANGE_PASSWORD, profileAPI.changePassword);
export const checkPassword = createAction(CHECK_PASSWORD, profileAPI.checkPassword);
export const getReviews = createAction(GET_REVIEWS, roomAPI.getUserReviews);
export const getFollowings = createAction(GET_FOLLOWINGS, profileAPI.getFollowings);
export const getFollowers = createAction(GET_FOLLOWERS, profileAPI.getFollowers);
export const getProfile = createAction(GET_PROFILE, profileAPI.getProfile);
export const initProfile = createAction(INIT_PROFILE);

const initialState = {
  changedPassword: null,
  checkedPassword: null,
  reviews: [],
  followings: [],
  followers: [],
  profile: null,
  error: null,
};

export default handleActions(
  {
    [PROFILE_UNFOLLOW]: (state, { payload: { followingId, isMe } }) => ({
      ...state,
      profile: {
        ...state.profile,
        ...(isMe
          ? {
              followings: state.profile.followings.filter((el) => el.followingId !== followingId),
            }
          : {
              followers: state.profile.followers.filter((el) => el.followerId !== followingId),
            }),
      },
    }),
    [PROFILE_FOLLOW]: (state, { payload: { followingId, isMe } }) => ({
      ...state,
      profile: {
        ...state.profile,
        ...(isMe
          ? {
              followings: state.profile.followings.concat([{ followingId: followingId }]),
            }
          : {
              followers: state.profile.followers.concat([{ followerId: followingId }]),
            }),
      },
    }),
    ...pender({
      type: CHANGE_PASSWORD,
      onSuccess: (state) => ({
        ...state,
        changedPassword: true,
      }),
      onFailure: (state, { payload: error }) => ({
        ...state,
        changedPassword: false,
        error,
      }),
    }),
    ...pender({
      type: CHECK_PASSWORD,
      onSuccess: (state) => ({
        ...state,
        checkedPassword: true,
      }),
      onFailure: (state, { payload: error }) => ({
        ...state,
        checkedPassword: false,
        error,
      }),
    }),
    ...pender({
      type: GET_REVIEWS,
      onSuccess: (state, { payload: reviews }) => ({
        ...state,
        reviews,
      }),
      onFailure: (state, { payload: error }) => ({
        ...state,
        error,
      }),
    }),
    ...pender({
      type: GET_FOLLOWINGS,
      onSuccess: (state, { payload: followings }) => ({
        ...state,
        followings,
      }),
      onFailure: (state, { payload: error }) => ({
        ...state,
        error,
      }),
    }),
    ...pender({
      type: GET_FOLLOWERS,
      onSuccess: (state, { payload: followers }) => ({
        ...state,
        followers,
      }),
      onFailure: (state, { payload: error }) => ({
        ...state,
        error,
      }),
    }),
    ...pender({
      type: GET_PROFILE,
      onSuccess: (state, { payload: profile }) => ({
        ...state,
        profile,
      }),
      onFailure: (state, { payload: error }) => ({
        ...state,
        error,
      }),
    }),
    [INIT_PROFILE]: () => initialState,
  },
  initialState,
);
