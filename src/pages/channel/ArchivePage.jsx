import React from 'react';
import ArchiveButtonListContainer from '../../containers/archive/ArchiveButtonListContainer';
import ArchiveContainer from '../../containers/archive/ArchiveContainer';
import CommentsContainer from '../../containers/common/CommentsContainer';
import FooterContainer from '../../containers/common/FooterContainer';
import HeaderContainer from '../../containers/common/HeaderContainer';
import ChannelNavContainer from './../../containers/channel/ChannelNavContainer';

const ArchivePage = ({ match }) => {
  const { channelId, archiveId } = match.params;
  return (
    <>
      <HeaderContainer />
      <ChannelNavContainer />
      <ArchiveContainer channelId={parseInt(channelId, 10)} archiveId={parseInt(archiveId, 10)} />
      <ArchiveButtonListContainer
        channelId={parseInt(channelId, 10)}
        archiveId={parseInt(archiveId, 10)}
      />
      <CommentsContainer channelId={parseInt(channelId, 10)} postId={parseInt(archiveId, 10)} />
      <FooterContainer />
    </>
  );
};

export default ArchivePage;
