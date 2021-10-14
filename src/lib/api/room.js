import axios from 'axios';

export const createRoom = async ({ status, name, channelId, postId, reservedTime }) => {
  const response = await axios.post('/api/Room', { status, name, channelId, postId, reservedTime });
  return response.data.data;
};
export const getRoomData = async (roomId) => {
  const response = await axios.get(`/api/Room/info/${roomId}`);
  return response.data.data;
};
export const getRoomList = async (channelId) => {
  const response = await axios.get(`/api/Room/${channelId}`);
  return response.data.data;
};
export const exitRoom = async (roomId) => {
  const response = await axios.patch('/api/Room/exit', { roomId });
  return response.data.data;
};
export const closeRoom = async (roomId) => {
  const response = await axios.patch('/api/Room/close', { roomId });
  return response.data.data;
};

export const reviewRoom = async ({ roomId, channelId, content, status, reviewedUserId }) => {
  const response = await axios.post('/api/Review', {
    roomId,
    channelId,
    content,
    status,
    reviewedUserId,
  });
  return response.data.data;
};

export const getUserReviews = async ({ userId }) => {
  const response = await axios.get(`/api/Review/list/${userId}`);
  return response.data.data;
};
