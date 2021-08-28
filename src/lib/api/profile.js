import axios from 'axios';

export const getProfile = async ({ userId }) => {
  const response = await axios({
    url: `/api/Profile/${userId}`,
    method: 'GET',
  });
  return response.data;
};

export const follow = async ({ followingId }) => {
  const response = await axios({
    url: `/api/Profile/follow`,
    method: 'POST',
    data: { followingId },
  });
  return response.data;
};

export const unfollow = async ({ followingId }) => {
  const response = await axios({
    url: `/api/Profile/unfollow`,
    method: 'POST',
    data: { followingId },
  });
  return response.data;
};

export const getFollowers = async ({ userId }) => {
  const response = await axios({
    url: `/api/Profile/followerlist/${userId}`,
    method: 'GET',
  });
  return response.data;
};

export const getFollowings = async ({ userId }) => {
  const response = await axios({
    url: `/api/Profile/followinglist/${userId}`,
    method: 'GET',
  });
  return response.data;
};

export const uploadProfile = async ({
  userId,
  department,
  introduce,
  welltalent,
  interesttalent,
  src,
}) => {
  const response = await axios({
    url: '/api/Profile',
    method: 'POST',
    data: { userId, department, introduce, welltalent, interesttalent, src },
  });
  return response.data;
};
