import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender/lib/utils';
import * as archiveAPI from '../lib/api/archive';

const GET_ARCHIVE = 'archive/GET_ARCHIVE';
const GET_CHANNEL_ARCHIVE = 'archive/GET_CHANNEL_ARCHIVE';
const GET_USER_ARCHIVE = 'archive/GET_USER_ARCHIVE';
const DELETE_ARCHIVE = 'archive/DELETE_ARCHIVE';
const LIKE_ARCHIVE = 'archive/LIKE_ARCHIVE';
const UNLIKE_ARCHIVE = 'archive/UNLIKE_ARCHIVE';
const INIT_ARCHIVE = 'archive/INIT_ARCHIVE';

export const getArchive = createAction(GET_ARCHIVE, archiveAPI.getArchive);
export const getChannelArchive = createAction(GET_CHANNEL_ARCHIVE, archiveAPI.getChannelArchive);
export const getUserArchive = createAction(GET_USER_ARCHIVE, archiveAPI.getUserArchive);
export const deleteArchive = createAction(DELETE_ARCHIVE, archiveAPI.deleteArchive);
export const likeArchive = createAction(LIKE_ARCHIVE, archiveAPI.likeArchive);
export const unlikeArchive = createAction(UNLIKE_ARCHIVE, archiveAPI.unlikeArchive);
export const initArchive = createAction(INIT_ARCHIVE);

const initialState = {
  channelArchive: null,
  userArchive: null,
  archive: null,
  error: null,
};

export default handleActions(
  {
    [INIT_ARCHIVE]: (state) => initialState,
    ...pender({
      type: GET_ARCHIVE,
      onSuccess: (state, { payload: archive }) => ({
        ...state,
        archive,
      }),
    }),
    ...pender({
      type: GET_CHANNEL_ARCHIVE,
      onSuccess: (state, { payload: channelArchive }) => ({
        ...state,
        channelArchive,
      }),
    }),
    ...pender({
      type: GET_USER_ARCHIVE,
      onSuccess: (state, { payload: userArchive }) => ({
        ...state,
        userArchive,
      }),
    }),
  },
  initialState,
);
