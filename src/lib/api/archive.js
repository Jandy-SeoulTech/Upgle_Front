import axios from 'axios';

export const getArchive = async (archiveId) => {
  const response = await axios.get(`/api/Archive/${archiveId}`);
  return response.data.data;
};

export const getChannelArchive = async (channelId) => {
  const response = await axios.get(`/api/Archive/channel/${channelId}`);
  return response.data.data;
};

export const getUserArchive = async (userId) => {
  const response = await axios.get(`/api/Archive/profile/${userId}`);
  return response.data.data;
};

export const writeArchive = async ({ channelId, postId, title, status, content, images }) => {
  const response = await axios.post(`/api/Archive`, {
    channelId,
    postId,
    title,
    status,
    content,
    images,
  });
  return response.data.data;
};

export const deleteArchive = async (archiveId) => {
  const response = await axios.delete(`/api/Archive/${archiveId}`);
  return response.data.data;
};

export const editArchive = async ({ archiveId, title, status, content, images }) => {
  const response = await axios.patch(`/api/Archive/${archiveId}`, {
    title,
    status,
    content,
    images,
  });
  return response.data.data;
};

export const likeArchive = async ({ channelId, archiveId }) => {
  const response = await axios.post(`/api/Archive/like`, { channelId, archiveId });
  return response.data.data;
};

export const unlikeArchive = async ({ archiveId }) => {
  const response = await axios.post(`/api/Archive/unlike`, { archiveId });
  return response.data.data;
};
