import { Route } from 'react-router-dom';
import React from 'react';
import ChannelProfilePage from '../pages/channel/ChannelProfilePage';
import ChannelHomePage from '../pages/channel/ChannelHomePage';
import ChannelPostListPage from '../pages/channel/ChannelPostListPage';
import ChannelPostPage from '../pages/channel/ChannelPostPage';
import EditChannelPage from '../pages/channel/EditChannelPage';
import CheckJoinChannel from '../middlewares/CheckJoinChannel';
import ChannelPostWritingPage from '../pages/channel/ChannelPostWritingPage';

const ChannelRouter = () => {
  return (
    <>
      <Route path="/channel/:channelId/profile" exact component={ChannelProfilePage} />
      <Route
        path="/channel/:channelId/home" exact
        render={(props) => <CheckJoinChannel {...props} Component={ChannelHomePage} />}
      />
      <Route
        path="/channel/:channelId/postList" exact
        render={(props) => <CheckJoinChannel {...props} Component={ChannelPostListPage} />}
      />
      <Route
        path="/channel/:channelId/writing" exact
        render={(props) => <CheckJoinChannel {...props} Component={ChannelPostWritingPage} />}
      />
      <Route
        path="/channel/:channelId/post/:postId" exact
        render={(props) => <CheckJoinChannel {...props} Component={ChannelPostPage} />}
      />
      <Route path="/channel/edit" exact render={(props) => <EditChannelPage />} />
    </>
  );
};

export default ChannelRouter;
