import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Main from "../../components/common/Main";
import { getPostList } from "../../modules/posts";

const MainContainer = (props) => {
  const { postList } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostList());
  }, [dispatch]);

  if (!postList) return <div>로딩중...</div>;

  return <Main postList={postList} />;
};

export default MainContainer;
