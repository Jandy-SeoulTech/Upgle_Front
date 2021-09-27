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
  const response = await axios.post('/api/Channel', {
    userId,
    channelId,
    name,
    introduce,
    tags,
    category,
    src,
  });
  return response.data.data;
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
  const response = await axios.post('/api/Channel', {
    userId,
    channelId,
    name,
    introduce,
    tags,
    category,
    src,
  });
  return response.data.data;
};

export const enterChannel = async ({ adminId, channelId }) => {
  const response = await axios.post('/api/Channel/enter', { adminId, channelId });
  return response.data.data;
};

export const exitChannel = async ({ adminId, channelId }) => {
  const response = await axios.post('/api/Channel/exit', { adminId, channelId });
  return response.data.data;
};

export const passAdmin = async ({ adminId, userId, channelId }) => {
  const response = await axios.post('/api/Channel/pass', { adminId, userId, channelId });
  return response.data.data;
};

export const likeChannel = async (channelId) => {
  const response = await axios.post('/api/Channel/like', { channelId });
  return response.data.data;
};

export const unlikeChannel = async (channelId) => {
  const response = await axios.post('/api/Channel/unlike', { channelId });
  return response.data.data;
};

export const banUser = async ({ adminId, userId, channelId }) => {
  const response = await axios.post('/api/Channel/ban', { adminId, userId, channelId });
  return response.data.data;
};

export const getChannelData = async (channelId) => {
  const response = await axios.get(`/api/Channel/info/${channelId}`);
  return response.data.data;
};

export const getMyChannel = async () => {
  const response = await axios.get(`/api/Profile/mychannel`);
  return response.data.data;
};
