import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import CreateChannel from '../../components/channel/CreateChannel';

const CreateChannelContainer = (props) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  return <CreateChannel />;
};
export default CreateChannelContainer;
