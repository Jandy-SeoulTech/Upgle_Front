import axios from 'axios';

export const createChannel = async ({
  userId,
  channelId,
  name,
  introduce,
  tags,
  category,
  src,
}) => {
  const response = await axios({
    url: '/api/Channel',
    method: 'POST',
    data: { userId, channelId, name, introduce, tags, category, src },
  });
  return response.data;
};

export const updateChannel = async ({
  userId,
  channelId,
  name,
  introduce,
  tags,
  category,
  src,
}) => {
  const response = await axios({
    url: '/api/Channel',
    method: 'PATCH',
    data: { userId, channelId, name, introduce, tags, category, src },
  });
  return response.data;
};

export const getChannelList = async (userId) => {
  const response = await axios({
    url: `/api/Channel/${userId}`,
    method: 'GET',
  });
  return response.data;
};

export const enterChannel = async ({ adminId, channelId }) => {
  const response = await axios({
    url: '/api/Channel/enter',
    method: 'POST',
    data: { adminId, channelId },
  });
  return response.data;
};

export const exitChannel = async ({ adminId, channelId }) => {
  const response = await axios({
    url: '/api/Channel/exit',
    method: 'POST',
    data: { adminId, channelId },
  });
  return response.data;
};

export const passAdmin = async ({ adminId, userId, channelId }) => {
  const response = await axios({
    url: '/api/Channel/pass',
    method: 'POST',
    data: { adminId, userId, channelId },
  });
  return response.data;
};

export const likeChannel = async (channelId) => {
  const response = await axios({
    url: '/api/Channel/like',
    method: 'POST',
    data: { channelId },
  });
  return response.data;
};

export const unlikeChannel = async (channelId) => {
  const response = await axios({
    url: '/api/Channel/unlike',
    method: 'POST',
    data: { channelId },
  });
  return response.data;
};

export const banUser = async ({ adminId, userId, channelId }) => {
  const response = await axios({
    url: `/api/Channel/ban`,
    method: 'GET',
    data: { adminId, userId, channelId },
  });
  return response.data;
};

export const getChannelData = async (channelId) => {
  const response = await axios({
    url: `/api/Channel/info/${channelId}`,
    method: 'GET',
  });
  return response.data;
};

export const getMyChannel = async () => {
  const response = await axios({
    url: `/api/Channel/mychannel`,
    method: 'GET',
  });
  return response.data;
};
