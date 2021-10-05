import React from 'react';
import CommentContainer from '../../containers/common/CommentContainer';
import FooterContainer from '../../containers/common/FooterContainer';
import HeaderContainer from '../../containers/common/HeaderContainer';
import PostButtonListContainer from '../../containers/post/PostButtonListContainer';
import PostContainer from '../../containers/post/PostContainer';
import ChannelNavContainer from './../../containers/channel/ChannelNavContainer';

const ChannelPostPage = ({ match }) => {
  const { channelId, postId } = match.params;
  return (
    <>
      <HeaderContainer />
      <ChannelNavContainer />
      <PostContainer channelId={parseInt(channelId, 10)} postId={parseInt(postId, 10)} />
      <PostButtonListContainer channelId={parseInt(channelId, 10)} postId={parseInt(postId, 10)} />
      <CommentContainer channelId={parseInt(channelId, 10)} postId={parseInt(postId, 10)} />
      <FooterContainer />
    </>
  );
};

export default ChannelPostPage;
