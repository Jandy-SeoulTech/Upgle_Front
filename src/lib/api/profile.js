import axios from 'axios';

export const getProfile = async ({ userId }) => {
  const response = await axios.get(`/api/Profile/${userId}`);
  return response.data.data;
};

export const follow = async ({ followingId }) => {
  const response = await axios.post('/api/Profile/follow', { followingId });
  return response.data.data;
};

export const unfollow = async ({ followingId }) => {
  const response = await axios.post('/api/Profile/unfollow', { followingId });
  return response.data.data;
};

export const getFollowers = async ({ userId }) => {
  const response = await axios.get(`/api/Profile/followerlist/${userId}`);
  return response.data.data;
};

export const getFollowings = async ({ userId }) => {
  const response = await axios.get(`/api/Profile/followinglist/${userId}`);
  return response.data.data;
};

export const getReviews = async ({ userId }) => {
  const response = await axios.get(`/api/Profile/reviewlist/${userId}`);
  return response.data.data;
};

export const uploadProfile = async ({
  userId,
  department,
  introduce,
  wellTalent,
  interestTalent,
  src,
}) => {
  const response = await axios.post('/api/Profile', {
    userId,
    department,
    introduce,
    wellTalent,
    interestTalent,
    src,
  });
  return response.data.data;
};

export const updateProfile = async ({
  userId,
  nickname,
  department,
  introduce,
  wellTalent,
  interestTalent,
  src,
}) => {
  const response = await axios.patch('/api/Profile', {
    userId,
    nickname,
    department,
    introduce,
    wellTalent,
    interestTalent,
    src,
  });
  return response.data.data;
};
export const checkPassword = async ({ password }) => {
  const response = await axios.post('/api/Profile/password', { password });
  return response.data.data;
};

export const changePassword = async ({ password }) => {
  const response = await axios.patch(`/api/Profile/password`, { password });
  return response.data.data;
};
