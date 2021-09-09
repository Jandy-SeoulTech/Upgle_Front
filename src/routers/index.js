import { BrowserRouter, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import SignupPage from '../pages/auth/SignupPage';
import SigninPage from '../pages/auth/SigninPage';
import SetNicknamePage from '../pages/profile/SetNicknamePage';
import ProfilePage from '../pages/profile/ProfilePage';
import UploadProfilePage from '../pages/profile/UploadProfilePage';
import ChattingRoomPage from '../pages/chat/ChattingRoomPage';
import ProfileSettingPage from '../pages/profile/ProfileSettingPage';
import ChannelRouter from './ChannelRouter';
import MyChannelPage from '../pages/channel/MyChannelPage';
import CheckLogin from '../middlewares/CheckLogin';

export default function RootRouter() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={MainPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/signin" component={SigninPage} />
      <Route path="/nickname" component={SetNicknamePage} />
      <Route path="/uploadProfile" exact component={UploadProfilePage} />
      <Route
        path="/profile/:userId"
        render={(props) => <CheckLogin {...props} Component={ProfilePage} />}
      />
      <Route
        path="/setting"
        render={(props) => (
          <CheckLogin {...props} Component={ProfileSettingPage} />
        )}
      />
      <Route
        path="/myChannel"
        render={(props) => <CheckLogin {...props} Component={MyChannelPage} />}
      />
      <Route path="/chat/:id" component={ChattingRoomPage} />
      <Route
        path="/channel/:channelId"
        render={(props) => <CheckLogin {...props} Component={ChannelRouter} />}
      />
    </BrowserRouter>
  );
}
