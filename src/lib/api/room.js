import axios from 'axios';

export const createRoom = ({ status, name, channelId, postId, reservedTime }) =>
  axios.post('/api/Room', { status, name, channelId, postId, reservedTime });
export const getRoomData = ({ roomId }) =>
  axios.get(`/api/Room/info/${roomId}`);
export const getRoomList = ({ channelId }) =>
  axios.get(`/api/Room/${channelId}`);
export const exitRoom = ({ roomId }) =>
  axios.patch('/api/Room/exit', { roomId });
export const closeRoom = ({ roomId }) =>
  axios.patch('/api/Room/close', { roomId });
export const reviewRoom = ({
  roomId,
  channelId,
  content,
  status,
  reviewedUserId,
}) =>
  axios.post('/api/Room/review', {
    roomId,
    channelId,
    content,
    status,
    reviewedUserId,
  });
