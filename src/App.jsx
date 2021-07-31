import { BrowserRouter, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './App.css';
import MainPage from './pages/MainPage';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <BrowserRouter>
      <Helmet>
        <title>서비스명</title>
      </Helmet>
      <Route path="/" exact component={MainPage} />
      <Route path="/signup" exact component={SignupPage} />
    </BrowserRouter>
  );
}

export default App;
