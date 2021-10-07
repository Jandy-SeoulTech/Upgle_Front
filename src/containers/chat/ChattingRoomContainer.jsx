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
import { getRoomData } from '../../modules/room';
import { getMychannel } from '../../modules/channel';

let socket;

const ChattingRoomContainer = ({ roomId }) => {
  const { user } = useSelector((state) => state.user);
  const { room } = useSelector((state) => state.room);
  const { messages, lastId } = useSelector((state) => state.chat);
  const [replyMessage, setReplyMessage] = useState();
  const [message, setMessage] = useState('');
  const [participants, setParticipants] = useState([]);
  const [currentId, setCurrentId] = useState(0);

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    socket = io(`${process.env.REACT_APP_SOCKET_ENDPOINT}/room-${roomId}`, {
      secure: true,
    });
    if (user) {
      socket.emit('join', { roomId, user }, (error) => {
        if (error) {
          alert(error);
        }
      });
    }
  }, [location, user]);

  useEffect(() => {
    socket.on('message', (message) => {
      if (message) {
        if (messages.length > 0 && messages[0].id === message.id) return;
        dispatch(concatRoomMessages(message));
      }
    });
    socket.on('RoomInfo', (participantInfo) => {
      setParticipants(participantInfo);
    });
  }, []);

  const handleSendMessage = async () => {
    if (message === '' || message === '\n') {
      return;
    }
    let tempMessage = message;
    setMessage('');
    if (replyMessage) {
      await dispatch(
        replyRoomMessage({
          roomId,
          answeredId: replyMessage.id,
          content: tempMessage,
        }),
      );
      setReplyMessage('');
    } else await dispatch(sendRoomMessage({ roomId, content: tempMessage }));
  };

  const handleGetMassage = async () => {
    if (lastId && currentId === lastId) return;
    await setCurrentId(lastId);
    await dispatch(
      getRoomMessages({
        roomId,
        lastId,
      }),
    );
  };

  const handleSuccess = () => {
    dispatch(getMychannel());
    window.close();
  };

  useEffect(() => {
    handleGetMassage();
    dispatch(getRoomData(roomId));
    return () => {
      dispatch(initialize());
    };
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
      participants={participants}
      handleSuccess={handleSuccess}
    />
  );
};

export default ChattingRoomContainer;
