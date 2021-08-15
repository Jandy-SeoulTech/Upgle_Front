import { combineReducers } from 'redux';
import posts, { postsSaga } from './posts';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import loading from './loading';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
  auth,
  posts,
  user,
  loading,
});

export function* rootSaga() {
  yield all([postsSaga(), authSaga(), userSaga()]);
}

export default rootReducer;
