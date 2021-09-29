import axios from 'axios';

export const getChannelMessages = async ({ channelId, lastId }) => {
  const response = await axios({
    url: `/api/Chat/channel/${channelId}?lastId=${lastId}&limit=20`,
    method: 'GET',
  });
  return response.data;
};

export const sendChannelMessage = async ({ channelId, content }) => {
  const response = await axios({
    url: `/api/Chat/channel/${channelId}/chat`,
    method: 'POST',
    data: { content },
  });
  return response.data;
};

export const getRoomMessages = async ({ roomId, lastId }) => {
  const response = await axios({
    url: `/api/Chat/room/${roomId}?lastId=${lastId}&limit=20`,
    method: 'GET',
  });
  return response.data;
};

export const sendRoomMessage = async ({ roomId, content }) => {
  const response = await axios({
    url: `/api/Chat/room/${roomId}/chat`,
    method: 'POST',
    data: { content },
  });
  return response.data;
};

export const replyRoomMessage = async ({ roomId, answeredId, content }) => {
  const response = await axios({
    url: `/api/Chat/room/${roomId}/answer`,
    method: 'POST',
    data: { answeredId, content },
  });
  return response.data;
};
