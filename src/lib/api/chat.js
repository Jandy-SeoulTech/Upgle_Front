import axios from 'axios';

export const getMessages = async ({ channelId, lastId }) => {
  const response = await axios({
    url: `/api/Chat/channel/${channelId}?lastId=${lastId}`,
    method: 'GET',
  });
  return response.data;
};

export const sendMessage = async ({ channelId, content }) => {
  const response = await axios({
    url: `/api/Chat/channel/${channelId}/chat`,
    method: 'POST',
    data: { content },
  });
  return response.data;
};
