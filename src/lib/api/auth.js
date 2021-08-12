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

export const oauthKakao = async (token) => {
  const response = await axios({
    method: 'get',
    url: '/api/OAuth/kakao',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  return response.data[0];
};

export const oauthGoogle = async (token) => {
  const response = await axios({
    method: 'post',
    url: '/api/OAuth/google',
    data: {
      token_type: token.token_type || 'bearer',
      access_token: token.access_token,
      scope: token.scope || '',
      expires_in: token.expires_in || '',
      id_token: token.id_token || '',
      expires_at: token.expires_at || '',
    },
  });
  return response.data;
};
