import React from 'react';
import ChattingRoomContainer from '../../containers/chat/ChattingRoomContainer';

const ChattingRoomPage = ({ match }) => {
  const { id } = match.params; // URL 파라미터 조회하기
  return <ChattingRoomContainer roomId={id} />;
};

export default ChattingRoomPage;
