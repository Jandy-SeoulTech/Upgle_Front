import axios from 'axios';

export const getChannelSearch = async ({ code, keyword, skip = 0, take = 30 }) => {
  const response = await axios.get(
    `/api/Search/?type=channel${code ? `&code=${code}` : ''}${
      keyword ? `&keyword=${keyword}` : ''
    }&skip=${skip}&take=${take}`,
  );
  return response.data.data;
};

export const getUserSearch = async ({ keyword, skip = 0, take = 15 }) => {
  const response = await axios.get(
    `/api/Search/?type=user${keyword ? `&keyword=${keyword}` : ''}&skip=${skip}&take=${take}`,
  );
  return response.data.data;
};

export const getArchiveSearch = async ({ keyword, skip = 0, take = 48 }) => {
  const response = await axios.get(
    `/api/Search/?type=archive${keyword ? `&keyword=${keyword}` : ''}&skip=${skip}&take=${take}`,
  );
  return response.data.data;
};
