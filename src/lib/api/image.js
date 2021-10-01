import axios from 'axios';

export const uploadImages = async (data) => {
  const response = await axios({
    url: '/api/Image/upload',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  });
  return response.data.data;
};
