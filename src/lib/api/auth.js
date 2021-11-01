import axios from 'axios';

export const signin = async ({ email, password }) => {
  const response = await axios.post('/api/Auth/login', { email, password });
  return response.data.data;
};

export const signup = async ({ email, password, nickname }) => {
  const response = await axios.post('/api/Auth/signup', { email, password, nickname });
  return response.data.data;
};

export const checkNickname = async ({ nickname }) => {
  const response = await axios.post('/api/Auth/nicknamecheck', { nickname });
  return response.data;
};

export const checkEmail = async ({ email }) => {
  const response = await axios.post('/api/Auth/emailcheck', { email });
  return response.data.data;
};

export const sendVerificationCode = async ({ email }) => {
  const response = await axios.post('/api/Auth/emailauth', { email });
  return response.data.data;
};

export const checkVerificationCode = async ({ email, auth }) => {
  const response = await axios.post('/api/Auth/authcheck', { email, auth });
  return response.data.data;
};

export const logout = async () => {
  const response = await axios.get('/api/Auth/logout');
  return response.data.data;
};

export const check = async () => {
  const response = await axios.get('/api/Auth');
  return response.data.data;
};

export const kakaoOauth = async (token) => {
  const response = await axios.post('/api/OAuth/kakao', { token });
  return response.data.data;
};

export const googleOauth = async (token) => {
  const response = await axios.post('/api/OAuth/google', { token });
  return response.data.data;
};

export const naverOauth = async (token) => {
  const response = await axios.post('/api/OAuth/naver', { token });
  return response.data.data;
};

export const setNickname = async ({ nickname }) => {
  const response = await axios.post('/api/Oauth/nickname', { nickname });
  return response.data.data;
};
