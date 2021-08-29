import axios from 'axios';

export const getMessages = async (channelId) => {
  const response = await axios({
    url: `/api/Chat/channel/${channelId}`,
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
