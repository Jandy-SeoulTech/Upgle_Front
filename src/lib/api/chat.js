import axios from 'axios';

export const getChannelMessages = async ({ channelId, lastId }) => {
  const response = await axios({
    url: `/api/Chat/channel/${channelId}?lastId=${lastId}`,
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
    url: `/api/Chat/room/${roomId}?lastId=${lastId}`,
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
