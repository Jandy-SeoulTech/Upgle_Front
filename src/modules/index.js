import { combineReducers } from 'redux';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import chat, { chatSaga } from './chat';
import channel, { channelSaga } from './channel';
import write, { writeSaga } from './write';
import image, { imageSaga } from './image';
import profile, { profileSaga } from './profile';
import loading from './loading';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
  auth,
  user,
  chat,
  channel,
  loading,
  write,
  image,
  profile,
});

export function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    chatSaga(),
    channelSaga(),
    writeSaga(),
    imageSaga(),
    profileSaga(),
  ]);
}

export default rootReducer;
