import { BrowserRouter, Route } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./App.css";
import MainPage from "./pages/MainPage";
import SigninPage from "./pages/SigninPage";

function App() {
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
