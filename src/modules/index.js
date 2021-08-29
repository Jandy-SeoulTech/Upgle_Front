import { combineReducers } from 'redux';
import posts, { postsSaga } from './posts';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import chat, { chatSaga } from './chat';
import channel, { channelSaga } from './channel';
import write, { writeSaga } from './write';
import image, { imageSaga } from './image';
import loading from './loading';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
  auth,
  posts,
  user,
  chat,
  channel,
  loading,
  write,
  image,
});

export function* rootSaga() {
  yield all([
    postsSaga(),
    authSaga(),
    userSaga(),
    chatSaga(),
    channelSaga(),
    writeSaga(),
    imageSaga(),
  ]);
}

export default rootReducer;
