import React, { useCallback, useEffect, useRef, useState } from 'react';
import ChatList from '../../components/chat/ChatList';
import io from 'socket.io-client';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages, sendMessage, concatMessages } from '../../modules/chat';

let socket;

const ChatListContainer = ({ namespace }) => {
  const { user } = useSelector((state) => state.user);
  const [message, setMessage] = useState('');
  const { messages } = useSelector((state) => state.chat);

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    socket = io(`${process.env.REACT_APP_SOCKET_ENDPOINT}/${namespace}`);
    if (user) {
      socket.emit('join', { user }, (error) => {
        if (error) {
          alert(error);
        }
      });
    }
  }, [location]);

  useEffect(() => {
    dispatch(getMessages({ channelId: 1, lastId: null }));
  }, [dispatch]);

  useEffect(() => {
    socket.on('message', (message) => {
      console.log(message);
      if (message) {
        dispatch(concatMessages(message));
      }
    });
  }, []);

  const handleSendMessage = useCallback(() => {
    dispatch(sendMessage({ channelId: 1, content: message }));
    setMessage('');
  }, [message]);

  if (!user) return '로딩중';

  return (
    <ChatList
      user={user}
      message={message}
      messages={messages}
      setMessage={setMessage}
      handleSendMessage={handleSendMessage}
    />
  );
};

export default ChatListContainer;
