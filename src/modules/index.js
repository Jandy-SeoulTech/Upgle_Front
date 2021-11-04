import { combineReducers } from 'redux';
import auth, { authSaga } from './auth';
import user from './user';
import chat from './chat';
import channel from './channel';
import write from './write';
import image from './image';
import profile from './profile';
import room from './room';
import comment from './comment';
import post from './post';
import archive from './archive';
import search from './search';
import { penderReducer } from 'redux-pender';
import { all } from '@redux-saga/core/effects';

const rootReducer = combineReducers({
  auth,
  user,
  chat,
  channel,
  write,
  image,
  profile,
  room,
  comment,
  post,
  archive,
  search,
  pender: penderReducer,
});

export function* rootSaga() {
  yield all([authSaga()]);
}

export default rootReducer;
