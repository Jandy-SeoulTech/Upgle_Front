import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender/lib/utils';
import * as commentAPI from '../lib/api/comment';

const GET_COMMENTS = 'comment/GET_COMMENTS';
const WRITE_COMMENT = 'comment/WRITE_COMMENT';
const EDIT_COMMENT = 'comment/EDIT_COMMENT';
const DELETE_COMMENT = 'comment/DELETE_COMMENT';
const INIT_COMMENT = 'comment/INIT_COMMENT';

export const getComments = createAction(GET_COMMENTS, commentAPI.getComments);
export const writeComment = createAction(WRITE_COMMENT, commentAPI.writeComment);
export const editComment = createAction(EDIT_COMMENT, commentAPI.editComment);
export const deleteComment = createAction(DELETE_COMMENT, commentAPI.deleteComment);
export const initComment = createAction(INIT_COMMENT);

const initialState = {
  comments: null,
  comment: null,
  error: null,
};

export default handleActions(
  {
    [INIT_COMMENT]: (state) => initialState,
    ...pender({
      type: GET_COMMENTS,
      onSuccess: (state, { payload: comments }) => ({
        ...state,
        comments,
      }),
    }),
    ...pender({
      type: WRITE_COMMENT,
      onSuccess: (state, { payload: comment }) => ({
        ...state,
        comment,
      }),
    }),
  },
  initialState,
);
