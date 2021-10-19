import React from 'react';
import HeaderContainer from '../../containers/common/HeaderContainer';
import ChannelNavContainer from '../../containers/channel/ChannelNavContainer';
import EditArchiveContainer from '../../containers/archive/EditArchiveContainer';

const EditArchivePage = ({ match }) => {
  const { channelId } = match.params;
  return (
    <>
      <HeaderContainer />
      <ChannelNavContainer />
      <EditArchiveContainer channelId={parseInt(channelId, 10)} />
    </>
  );
};

export default EditArchivePage;
