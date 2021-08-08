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

export const checkNickname = async ({ nickname }) => {
  const response = await axios({
    url: '/api/Auth/nicknamecheck',
    method: 'POST',
    data: { nickname },
  });
  return response.data;
};

export const checkEmail = async ({ email }) => {
  const response = await axios({
    url: '/api/Auth/emailcheck',
    method: 'POST',
    data: { email },
  });
  return response.data;
};

export const sendVerificationCode = async ({ email }) => {
  const response = await axios({
    url: '/api/Auth/emailauth',
    method: 'POST',
    data: { email },
  });
  return response.data;
};

export const checkVerificationCode = async ({ email, auth }) => {
  const response = await axios({
    url: '/api/Auth/authcheck',
    method: 'POST',
    data: { email, auth },
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
