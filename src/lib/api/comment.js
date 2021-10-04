import axios from 'axios';

export const writeComment = async ({ channelId, postId, content }) => {
    const response = await axios.post('/api/Comment', { channelId, postId, content });
    return response.data.data;
};

export const editComment = async ({ commentId, content }) => {
    const response = await axios.patch(`/api/Comment/${commentId}`, { content });
    return response.data.data;
};

export const deleteComment = async ({ channelId, postId, content }) => {
    const response = await axios.delete('/api/Comment', { channelId, postId, content });
    return response.data.data;
};

