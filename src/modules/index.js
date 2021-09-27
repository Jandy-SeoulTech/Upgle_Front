import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import chat from './chat';
import channel from './channel';
import write from './write';
import image from './image';
import profile from './profile';
import room from './room';
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
  pender: penderReducer,
});

export default rootReducer;
