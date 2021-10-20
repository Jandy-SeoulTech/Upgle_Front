import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Main from '../../components/common/Main';

const MainContainer = (props) => {
  const { user } = useSelector((state) => state.user);
  const history = useHistory();

  useEffect(() => {
    if (user) {
      if (!user.nickname) history.push('/nickname');
      else if (!user.profile) history.push('/uploadProfile');
    }
  }, [user, history]);

  return <Main user={user} />;
};

export default MainContainer;
