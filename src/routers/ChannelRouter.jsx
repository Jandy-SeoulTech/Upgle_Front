import { Route } from 'react-router-dom';
import React from 'react';
import ChannelProfilePage from '../pages/channel/ChannelProfilePage';
import ChannelHomePage from '../pages/channel/ChannelHomePage';
import ChannelPostListPage from '../pages/channel/ChannelPostListPage';
import ChannelPostPage from '../pages/channel/ChannelPostPage';
import EditChannelPage from '../pages/channel/EditChannelPage';
import EditArchivePage from '../pages/channel/EditArchivePage';
import CheckJoinChannel from '../middlewares/CheckJoinChannel';
import EditPostPage from '../pages/channel/EditPostPage';
import ChannelRoomListPage from '../pages/channel/ChannelRoomListPage';
import ArchiveListPage from '../pages/channel/ArchiveListPage';
import ArchivePage from '../pages/channel/ArchivePage';

const ChannelRouter = () => {
  return (
    <>
      <Route path="/channel/:channelId/profile" exact component={ChannelProfilePage} />
      <Route path="/channel/edit" exact render={(props) => <EditChannelPage />} />
      <Route
        path="/channel/:channelId/home"
        exact
        render={(props) => <CheckJoinChannel {...props} Component={ChannelHomePage} />}
      />
      <Route
        path="/channel/:channelId/post"
        exact
        render={(props) => <CheckJoinChannel {...props} Component={ChannelPostListPage} />}
      />
      <Route
        path="/channel/:channelId/post/:postId"
        exact
        render={(props) => <CheckJoinChannel {...props} Component={ChannelPostPage} />}
      />
      <Route
        path="/channel/:channelId/editPost"
        exact
        render={(props) => <CheckJoinChannel {...props} Component={EditPostPage} />}
      />
      <Route
        path="/channel/:channelId/room"
        exact
        render={(props) => <CheckJoinChannel {...props} Component={ChannelRoomListPage} />}
      />
      <Route path="/channel/:channelId/archive" exact component={ArchiveListPage} />
      <Route path="/channel/:channelId/archive/:archiveId" exact component={ArchivePage} />
      <Route
        path="/channel/:channelId/editArchive"
        exact
        render={(props) => <CheckJoinChannel {...props} Component={EditArchivePage} />}
      />
    </>
  );
};

export default ChannelRouter;
