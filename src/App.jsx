import { BrowserRouter, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MainPage from './pages/MainPage';
import SignupPage from './pages/auth/SignupPage';
import SigninPage from './pages/auth/SigninPage';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { check } from './modules/user';
import SetNicknamePage from './pages/profile/SetNicknamePage';
import UploadProfilePage from './pages/profile/UploadProfilePage';
import EditChannelPage from './pages/channel/EditChannelPage';
import ChannelProfilePage from './pages/channel/ChannelProfilePage';
import ChannelHomePage from './pages/channel/ChannelHomePage';
import MyChannelPage from './pages/channel/MyChannelPage';
import ProfilePage from './pages/profile/ProfilePage';
import ChannelPostEditPage from './pages/channel/ChannelPostEditPage';

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
      <Route path="/channel/post/edit" component={ChannelPostEditPage} />
    </BrowserRouter>
  );
}

export default App;
