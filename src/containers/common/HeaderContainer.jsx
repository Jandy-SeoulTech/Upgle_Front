import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/common/Header';
import { logout } from '../../modules/user';
import { useHistory } from 'react-router';

const HeaderContainer = ({ initialKeyword = '' }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogout = () => {
    dispatch(logout());
    history.push('/');
  };
  return <Header user={user} initialKeyword={initialKeyword} onLogout={onLogout} />;
};

export default HeaderContainer;
