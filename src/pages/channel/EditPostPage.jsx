import React from 'react';
import HeaderContainer from '../../containers/common/HeaderContainer';
import ChannelNavContainer from '../../containers/channel/ChannelNavContainer';
import EditPostContainer from '../../containers/post/EditPostContainer';

const EditPostPage = ({ match }) => {
  const { channelId } = match.params;
  return (
    <>
      <HeaderContainer />
      <ChannelNavContainer />
      <EditPostContainer channelId={parseInt(channelId, 10)} />
    </>
  );
};

export default EditPostPage;
