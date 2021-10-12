import axios from 'axios';

export const getComment = async (commentId) => {
  const response = await axios.get(`/api/Comment/${commentId}`);
  return response.data.data;
};

export const getComments = async ({ type, postOrArchiveId }) => {
  const response = await axios.get(`/api/Comment/?type=${type}&id=${postOrArchiveId}`);
  return response.data.data;
};

export const writeComment = async ({ type, channelId, postOrArchiveId, content }) => {
  const response = await axios.post(`/api/Comment/?type=${type}&id=${postOrArchiveId}`, {
    channelId,
    content,
  });
  return response.data.data;
};

export const editComment = async ({ commentId, content }) => {
  const response = await axios.patch(`/api/Comment/${commentId}`, { content });
  return response.data.data;
};

export const deleteComment = async ({ commentId }) => {
  const response = await axios.delete(`/api/Comment/${commentId}`);
  return response.data.data;
};
