import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { check } from './modules/user';
import RootRouter from './routers';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(check());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Upgle</title>
      </Helmet>
      <RootRouter />
    </>
  );
}

export default App;
