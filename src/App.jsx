import { BrowserRouter, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './App.css';
import MainPage from './pages/MainPage';
import SigninPage from './pages/SigninPage';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { check } from './modules/user';

function App() {
  const dispath = useDispatch();

  useEffect(() => {
    dispath(check());
  }, [dispath]);

  return (
    <BrowserRouter>
      <Helmet>
        <title>서비스명</title>
      </Helmet>
      <Route path="/" exact component={MainPage} />
      <Route path="/signin" exact component={SigninPage} />
    </BrowserRouter>
  );
}

export default App;
