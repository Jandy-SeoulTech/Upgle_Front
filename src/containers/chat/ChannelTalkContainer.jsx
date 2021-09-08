import React, { useCallback, useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMessages,
  sendMessage,
  concatMessages,
  initialize,
} from '../../modules/chat';
import ChannelTalk from '../../components/chat/ChannelTalk';

let socket;

const ChannelTalkContainer = ({ channel }) => {
  const { user } = useSelector((state) => state.user);
  const [message, setMessage] = useState('');
  const { messages, lastId } = useSelector((state) => state.chat);

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    socket = io(
      `${process.env.REACT_APP_SOCKET_ENDPOINT}/channel-${channel.id}`,
    );
    if (user) {
      socket.emit('join', { user }, (error) => {
        if (error) {
          alert(error);
        }
      });
    }
  }, [location]);

  useEffect(() => {
    handleGetMassage();
    return () => {
      dispatch(initialize());
    };
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
    if (!message) return;
    dispatch(sendMessage({ channelId: channel.id, content: message }));
    setMessage('');
  }, [message]);

  const handleGetMassage = () => {
    dispatch(
      getMessages({
        channelId: channel.id,
        lastId,
      }),
    );
  };

  if (!user) return '로딩중';

  return (
    <ChannelTalk
      user={user}
      message={message}
      messages={messages}
      setMessage={setMessage}
      handleSendMessage={handleSendMessage}
      handleGetMassage={handleGetMassage}
    />
  );
};

export default ChannelTalkContainer;
