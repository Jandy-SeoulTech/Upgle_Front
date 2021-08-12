import axios from 'axios';

export const signin = async ({ email, password }) => {
  const response = await axios({
    url: '/api/Auth/login',
    method: 'POST',
    data: { email, password },
  });
  return response.data;
};

export const signup = async ({ email, password, nickname }) => {
  const response = await axios({
    url: '/api/Auth/signup',
    method: 'POST',
    data: { email, password, nickname },
  });
  return response.data;
};

export const logout = async () => {
  const response = await axios({
    url: '/api/Auth/logout',
    method: 'GET',
  });
  return response.data;
};

export const check = async () => {
  const response = await axios({
    url: '/api/Auth',
    method: 'GET',
  });
  return response.data;
};

export const kakaoOauth = async (token) => {
  const response = await axios({
    method: 'post',
    url: '/api/OAuth/kakao',
    data: { token },
  });
  return response.data;
};

export const googleOauth = async (token) => {
  const response = await axios({
    method: 'post',
    url: '/api/OAuth/google',
    data: {
      token,
    },
  });
  return response.data;
};
