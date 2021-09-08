import { BrowserRouter, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MainPage from './pages/MainPage';
import SignupPage from './pages/auth/SignupPage';
import SigninPage from './pages/auth/SigninPage';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { check } from './modules/user';
import SetNicknamePage from './pages/profile/SetNicknamePage';
import EditChannelPage from './pages/channel/EditChannelPage';
import ChannelProfilePage from './pages/channel/ChannelProfilePage';
import ChannelHomePage from './pages/channel/ChannelHomePage';
import MyChannelPage from './pages/channel/MyChannelPage';
import ProfilePage from './pages/profile/ProfilePage';
import ChannelPostEditPage from './pages/channel/ChannelPostEditPage';
import UploadProfilePage from './pages/profile/UploadProfilePage';
import ChannelPostListPage from './pages/channel/ChannelPostListPage';
import ChannelPostPage from './pages/channel/ChannelPostPage';
import ChattingRoomPage from './pages/chat/ChattingRoomPage';
import ProfileSettingPage from './pages/profile/ProfileSettingPage';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(check());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Helmet>
        <title>Upgle</title>
      </Helmet>
      <Route path="/" exact component={MainPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/signin" component={SigninPage} />
      <Route path="/nickname" component={SetNicknamePage} />
      <Route path="/uploadProfile" exact component={UploadProfilePage} />
      <Route path="/myChannel" component={MyChannelPage} />
      <Route path="/editChannel" component={EditChannelPage} />
      <Route path="/channelProfile/:id" exact component={ChannelProfilePage} />
      <Route path="/channelHome/:id" exact component={ChannelHomePage} />
      <Route path="/profile/:userId" component={ProfilePage} />
      <Route path="/channelPost" exact component={ChannelPostListPage} />
      <Route path="/channelPost/edit" exact component={ChannelPostEditPage} />
      <Route path="/channelPost/id" exact component={ChannelPostPage} />
      <Route path="/chat/:chatId" />
      <Route path="/chat/:id" component={ChattingRoomPage} />
      <Route path="/setting" component={ProfileSettingPage} />
    </BrowserRouter>
  );
}

export default App;
