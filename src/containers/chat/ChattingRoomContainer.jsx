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
import { getRoomData, reviewRoom } from '../../modules/room';

let socket;

const ChattingRoomContainer = ({ roomId }) => {
  const { user } = useSelector((state) => state.user);
  const { room } = useSelector((state) => state.room);
  const { messages, lastId } = useSelector((state) => state.chat);
  const [replyMessage, setReplyMessage] = useState();
  const [message, setMessage] = useState('');
  const [participants, setParticipants] = useState([]);

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
        dispatch(concatRoomMessages(message));
      }
    });
    socket.on('RoomInfo', (participantInfo) => {
      console.log(setParticipants(participantInfo));
    });
    socket.emit('test', { message: 'test' });
  }, []);

  const handleSendMessage = useCallback(() => {
    if (message === '' || message === '\n') {
      setMessage('');
      return;
    }
    if (replyMessage) {
      dispatch(
        replyRoomMessage({
          roomId,
          answeredId: replyMessage.id,
          content: message,
        }),
      );
      setReplyMessage('');
    } else dispatch(sendRoomMessage({ roomId, content: message }));
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

  const handleReview = ({ review, rate }) => {
    dispatch(
      reviewRoom({
        roomId,
        content: review,
        status: rate,
        reviewedUserId: user.id,
      }),
    );
  };

  useEffect(() => {
    dispatch(getRoomData({ roomId }));
  }, [dispatch, roomId]);

  if (!user) return '로그인해주세요';
  if (!room || !messages || !participants) return '로딩중';

  return (
    <ChattingRoom
      user={user}
      room={room}
      messages={messages}
      message={message}
      setMessage={setMessage}
      handleSendMessage={handleSendMessage}
      handleGetMassage={handleGetMassage}
      replyMessage={replyMessage}
      setReplyMessage={setReplyMessage}
      handleReview={handleReview}
      participants={participants}
    />
  );
};

export default ChattingRoomContainer;
