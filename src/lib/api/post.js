import axios from 'axios';

export const getChannelPostList = async ({ channelId, query }) => {
    const response = await axios.get(`/api/Post/channel/${channelId}?${query}`);
    return response.data.data;
};

export const getPost = async (postId) => {
    const response = await axios.get(`/api/Post/${postId}`);
    return response.data.data;
};

export const writePost = async ({ channelId, title, status, content, images }) => {
    const response = await axios.post('/api/Post', { channelId, title, status, content, images });
    return response.data.data;
};

export const editPost = async ({ postId, channelId, title, status, content, images, }) => {
    const response = await axios.patch(`/api/Post/${postId}`, { channelId, title, status, content, images });
    return response.data.data;
};

export const deletePost = async ({ postId, channelId }) => {
    const response = await axios.delete(`/api/Post/${postId}`, { channelId });
    return response.data.data;
};

export const attentionPost = async (postId) => {
    const response = await axios.post(`/api/Post/${postId}/attention`);
    return response.data.data;
};

export const unAttentionPost = async (postId) => {
    const response = await axios.post(`/api/Post/${postId}/notattention`);
    return response.data.data;
};
