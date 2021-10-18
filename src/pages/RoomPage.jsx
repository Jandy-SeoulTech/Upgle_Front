import React from 'react';
import RoomContainer from '../containers/room/RoomContainer';

const RoomPage = ({ match }) => {
  const { id } = match.params; // URL 파라미터 조회하기
  return <RoomContainer roomId={id} />;
};

export default RoomPage;
