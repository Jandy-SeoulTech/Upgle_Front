import React, { useCallback, useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  getChannelMessages,
  sendChannelMessage,
  concatChannelMessages,
  initialize,
} from '../../modules/chat';
import ChatList from '../../components/channel/TalkList';

let socket;

const ChannelTalkContainer = ({ channel }) => {
  const { user } = useSelector((state) => state.user);
  const [message, setMessage] = useState('');
  const { messages, lastId } = useSelector((state) => state.chat);

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    socket = io(`${process.env.REACT_APP_SOCKET_ENDPOINT}/channel-${channel.id}`, { secure: true });
    if (user) {
      socket.emit('join', { user }, (error) => {
        if (error) {
          alert(error);
        }
      });
    }
  }, [location, user]);

  useEffect(() => {
    handleGetMassage();
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);

  useEffect(() => {
    socket.on('message', (message) => {
      if (message) {
        dispatch(concatChannelMessages(message));
      }
    });
  }, []);

  const handleSendMessage = useCallback(() => {
    if (message === '' || message === '\n') {
      setMessage('');
      return;
    }
    dispatch(sendChannelMessage({ channelId: channel.id, content: message }));
  }, [message]);

  const handleGetMassage = () => {
    dispatch(
      getChannelMessages({
        channelId: channel.id,
        lastId,
      }),
    );
  };

  if (!user) return '로딩중';

  return (
    <ChatList
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
