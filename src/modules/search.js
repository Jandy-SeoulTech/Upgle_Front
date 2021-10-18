import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender/lib/utils';
import * as searchAPI from '../lib/api/search';

const GET_ARCHIVE_SEARCH = 'search/GET_ARCHIVE_SEARCH';
const GET_USER_SEARCH = 'search/GET_USER_SEARCH';
const GET_CHANNEL_SEARCH = 'search/GET_CHANNEL_SEARCH';
const INIT_SEARCH = 'search/INIT_SEARCH';

export const getArchiveSearch = createAction(GET_ARCHIVE_SEARCH, searchAPI.getArchiveSearch);
export const getUserSearch = createAction(GET_USER_SEARCH, searchAPI.getUserSearch);
export const getChannelSearch = createAction(GET_CHANNEL_SEARCH, searchAPI.getChannelSearch);
export const initSearch = createAction(INIT_SEARCH);

const initialState = {
  totalCounts: { channels: 0, users: 0, archives: 0 },
  channels: [],
  users: [],
  archives: [],
  error: null,
};

export default handleActions(
  {
    [INIT_SEARCH]: (state) => initialState,
    ...pender({
      type: GET_CHANNEL_SEARCH,
      onSuccess: (state, { payload: { totalCount, channels } }) => ({
        ...state,
        totalCounts: { ...state.totalCounts, channels: totalCount },
        channels: [...state.channels, ...channels],
      }),
    }),
    ...pender({
      type: GET_USER_SEARCH,
      onSuccess: (state, { payload: { totalCount, users } }) => ({
        ...state,
        totalCounts: { ...state.totalCounts, users: totalCount },
        users: [...state.users, ...users],
      }),
    }),
    ...pender({
      type: GET_ARCHIVE_SEARCH,
      onSuccess: (state, { payload: { totalCount, archives } }) => ({
        ...state,
        totalCounts: { ...state.totalCounts, archives: totalCount },
        archives: [...state.archives, ...archives],
      }),
    }),
  },
  initialState,
);
