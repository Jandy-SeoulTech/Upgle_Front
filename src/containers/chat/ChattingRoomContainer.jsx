import React, { useCallback, useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  getRoomMessages,
  sendRoomMessage,
  concatRoomMessages,
  replyRoomMessage,
  initialize,
} from '../../modules/chat';
import ChattingRoom from '../../components/chat/ChattingRoom';

let socket;

const ChattingRoomContainer = ({ roomId }) => {
  const { user } = useSelector((state) => state.user);
  const { messages, lastId } = useSelector((state) => state.chat);
  const [replyId, setReplyId] = useState(false);
  const [replyMessage, setReplyMessage] = useState(false);
  const [message, setMessage] = useState('');
  const room = {
    title: '채팅방 이름',
    admin: {
      id: 64,
      nickname: '관리자임',
      profile: {
        profileImage: '',
      },
    },
  };

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    socket = io(`${process.env.REACT_APP_SOCKET_ENDPOINT}/room-${roomId}`);
    if (user) {
      socket.emit('join', { roomId, user }, (error) => {
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
      if (message) {
        dispatch(concatRoomMessages(message));
      }
    });
  }, []);

  const handleSendMessage = useCallback(() => {
    if (message === '' || message === '\n') {
      setMessage('');
      return;
    }
    if (replyId)
      dispatch(
        replyRoomMessage({ roomId, answerId: replyId, content: message }),
      );
    else dispatch(sendRoomMessage({ roomId, content: message }));
    setMessage('');
  }, [message]);

  const handleGetMassage = () => {
    dispatch(
      getRoomMessages({
        roomId,
        lastId,
      }),
    );
  };

  if (!user) return '로그인해주세요';
  if (!messages) return '로딩중';

  return (
    <ChattingRoom
      user={user}
      room={room}
      messages={messages}
      message={message}
      setReplyId={setReplyId}
      setMessage={setMessage}
      handleSendMessage={handleSendMessage}
      handleGetMassage={handleGetMassage}
      replyMessage={replyMessage}
      setReplyMessage={setReplyMessage}
    />
  );
};

export default ChattingRoomContainer;
