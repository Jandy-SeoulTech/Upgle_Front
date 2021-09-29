import { Route } from 'react-router-dom';
import React from 'react';
import ChannelProfilePage from '../pages/channel/ChannelProfilePage';
import ChannelHomePage from '../pages/channel/ChannelHomePage';
import ChannelPostEditPage from '../pages/channel/ChannelPostEditPage';
import ChannelPostListPage from '../pages/channel/ChannelPostListPage';
import ChannelPostPage from '../pages/channel/ChannelPostPage';
import EditChannelPage from '../pages/channel/EditChannelPage';
import CheckJoinChannel from '../middlewares/CheckJoinChannel';

const ChannelRouter = () => {
  return (
    <>
      <Route
        path="/channel/:channelId/profile"
        component={ChannelProfilePage}
      />
      <Route
        path="/channel/:channelId/home"
        render={(props) => (
          <CheckJoinChannel {...props} Component={ChannelHomePage} />
        )}
      />
      <Route
        path="/channel/:channelId/postList"
        render={(props) => (
          <CheckJoinChannel {...props} Component={ChannelPostListPage} />
        )}
      />
      <Route
        path="/channel/:channelId/post/edit"
        render={(props) => (
          <CheckJoinChannel {...props} Component={ChannelPostEditPage} />
        )}
      />
      <Route
        path="/channel/:channelId/post/:postId"
        render={(props) => (
          <CheckJoinChannel {...props} Component={ChannelPostPage} />
        )}
      />
      <Route
        path="/channel/:channelId/edit"
        render={(props) => (
          <CheckJoinChannel {...props} Component={EditChannelPage} />
        )}
      />
    </>
  );
};

export default ChannelRouter;
