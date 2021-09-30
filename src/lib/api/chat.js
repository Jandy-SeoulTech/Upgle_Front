import axios from 'axios';

export const getChannelMessages = async ({ channelId, lastId }) => {
  const response = await axios.get(`/api/Chat/channel/${channelId}?lastId=${lastId}&limit=20`);
  return response.data.data;
};

export const sendChannelMessage = async ({ channelId, content }) => {
  const response = await axios.post(`/api/Chat/channel/${channelId}/chat`, { content });
  return response.data.data;
};

export const getRoomMessages = async ({ roomId, lastId }) => {
  const response = await axios.get(`/api/Chat/room/${roomId}?lastId=${lastId}&limit=20`);
  return response.data.data;
};

export const sendRoomMessage = async ({ roomId, content }) => {
  const response = await axios.post(`/api/Chat/room/${roomId}/chat`, { content });
  return response.data.data;
};

export const replyRoomMessage = async ({ roomId, answeredId, content }) => {
  const response = await axios.post(`/api/Chat/room/${roomId}/answer`, { answeredId, content });
  return response.data.data;
};
