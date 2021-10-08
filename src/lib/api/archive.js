import axios from 'axios';

export const getArchive = async (archivedId) => {
    const response = await axios.get(`/api/Archive/${archivedId}`);
    return response.data.data;
};

export const getChannelArchive = async (channelId) => {
    const response = await axios.get(`/api/Archive/channel/${channelId}`);
    return response.data.data;
};

export const getUserArchive = async (userId) => {
    const response = await axios.get(`/api/Archive/profile/${userId}`);
    return response.data.data;
};

export const writeArchive = async ({ channelId, postId, title, status, content, images }) => {
    const response = await axios.post(`/api/Archive`, { channelId, postId, title, status, content, images });
    return response.data.data;
};

export const deleteArchive = async (archivedId) => {
    const response = await axios.delete(`/api/Archive/${archivedId}`);
    return response.data.data;
};

export const editArchive = async ({ archivedId, title, status, content, images }) => {
    const response = await axios.patch(`/api/Archive/${archivedId}`, { title, status, content, images });
    return response.data.data;
};

export const likeArchive = async ({ channelId, archivedId }) => {
    const response = await axios.post(`/api/Archive/like`, { channelId, archivedId });
    return response.data.data;
};

export const unlikeArchive = async (archivedId) => {
    const response = await axios.post(`/api/Archive/unlike`, { archivedId });
    return response.data.data;
};
