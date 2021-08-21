import { combineReducers } from 'redux';
import posts, { postsSaga } from './posts';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import write, { writeSaga } from './write';
import image, { imageSaga } from './image';
import loading from './loading';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
  auth,
  posts,
  user,
  loading,
  write,
  image,
});

export function* rootSaga() {
  yield all([postsSaga(), authSaga(), userSaga(), writeSaga(), imageSaga()]);
}

export default rootReducer;
