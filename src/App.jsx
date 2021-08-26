import { BrowserRouter, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MainPage from './pages/MainPage';
import SignupPage from './pages/auth/SignupPage';
import SigninPage from './pages/auth/SigninPage';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { check } from './modules/user';
import SetNicknamePage from './pages/profile/SetNicknamePage';
import ProfilePage from './pages/profile/ProfilePage';
import UploadProfilePage from './pages/profile/UploadProfilePage';

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
      <Route path="/signup" exact component={SignupPage} />
      <Route path="/signin" exact component={SigninPage} />
      <Route path="/nickname" exact component={SetNicknamePage} />
      <Route path="/profile/:userId" component={ProfilePage} />
      <Route path="/uploadProfile" exact component={UploadProfilePage} />
    </BrowserRouter>
  );
}

export default App;
