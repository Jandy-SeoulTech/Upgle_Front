import { combineReducers } from 'redux';
import auth from './auth';
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
import { penderReducer } from 'redux-pender';

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
  pender: penderReducer,
});

export default rootReducer;
