import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Main from '../../components/common/Main';
import { getPostList } from '../../modules/posts';

const MainContainer = (props) => {
  const { user } = useSelector((state) => state.user);
  const { postList } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (user && !user.nickname) {
      history.push('/nickname');
    }
  }, [user, history]);

  useEffect(() => {
    dispatch(getPostList());
  }, [dispatch]);

  if (!postList) return <div>로딩중...</div>;

  return <Main postList={postList} />;
};

export default MainContainer;
