import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  getChannelMessages,
  sendChannelMessage,
  concatChannelMessages,
  initialize,
} from '../../modules/chat';
import TalkList from '../../components/channel/TalkList';

let socket;

const ChannelTalkContainer = ({ channel }) => {
  const { user } = useSelector((state) => state.user);
  const [message, setMessage] = useState('');
  const { messages, lastId } = useSelector((state) => state.chat);
  const [currentId, setCurrentId] = useState(0);

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    socket = io(`${process.env.REACT_APP_SOCKET_ENDPOINT}/channel-${channel.id}`);
  }, [location, user]);

  useEffect(() => {
    socket.on('message', (message) => {
      if (message) {
        if (messages.length > 0 && messages[0].id === message.id) return;
        dispatch(concatChannelMessages(message));
      }
    });
  }, []);

  const handleSendMessage = async () => {
    if (message === '' || message === '\n') {
      return;
    }
    let tempMessage = message;
    setMessage('');
    await dispatch(sendChannelMessage({ channelId: channel.id, content: tempMessage }));
  };

  const handleGetMassage = async () => {
    if (lastId && currentId === lastId) return;
    await setCurrentId(lastId);
    await dispatch(
      getChannelMessages({
        channelId: channel.id,
        lastId,
      }),
    );
  };

  useEffect(() => {
    handleGetMassage();
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);

  if (!user) return '로딩중';

  return (
    <TalkList
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
