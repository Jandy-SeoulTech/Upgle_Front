import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import EditChannel from '../../components/channel/EditChannel';
import { initializeWrite } from '../../modules/write';

const EditChannelContainer = (props) => {
  const { writeChannel } = useSelector((state) => state.write);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    return () => {
      dispatch(initializeWrite());
    };
  }, [dispatch]);

  return <EditChannel writeChannel={writeChannel} />;
};
export default EditChannelContainer;
