import { Route } from 'react-router-dom';
import React from 'react';
import ChannelProfilePage from '../pages/channel/ChannelProfilePage';
import ChannelHomePage from '../pages/channel/ChannelHomePage';
import ChannelPostListPage from '../pages/channel/ChannelPostListPage';
import ChannelPostPage from '../pages/channel/ChannelPostPage';
import EditChannelPage from '../pages/channel/EditChannelPage';
import CheckJoinChannel from '../middlewares/CheckJoinChannel';
import EditPostPage from '../pages/channel/EditPostPage';
import ChannelChatListPage from '../pages/channel/ChannelChatListPage';
import ChannelArchivePage from '../pages/channel/ChannelArchivePage';

const ChannelRouter = () => {
  return (
    <>
      <Route path="/channel/:channelId/profile" exact component={ChannelProfilePage} />
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
        path="/channel/:channelId/editArchive"
        exact
        render={(props) => <CheckJoinChannel {...props} Component={EditPostPage} />}
      />
      <Route
        path="/channel/:channelId/archive"
        exact
        render={(props) => <CheckJoinChannel {...props} Component={ChannelArchivePage} />}
      />
      <Route
        path="/channel/:channelId/archive/:archiveId"
        exact
        render={(props) => <CheckJoinChannel {...props} Component={ChannelArchivePage} />}
      />
      <Route
        path="/channel/:channelId/chat"
        exact
        render={(props) => <CheckJoinChannel {...props} Component={ChannelChatListPage} />}
      />
      <Route
        path="/channel/:channelId/editPost"
        exact
        render={(props) => <CheckJoinChannel {...props} Component={EditPostPage} />}
      />
      <Route
        path="/channel/:channelId/post/:postId"
        exact
        render={(props) => <CheckJoinChannel {...props} Component={ChannelPostPage} />}
      />
      <Route path="/channel/edit" exact render={(props) => <EditChannelPage />} />
    </>
  );
};

export default ChannelRouter;
