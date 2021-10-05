import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender/lib/utils';
import * as commentAPI from '../lib/api/comment';

const WRITE_COMMENT = 'comment/WRITE_COMMENT';
const EDIT_COMMENT = 'comment/EDIT_COMMENT';
const DELETE_COMMENT = 'comment/DELETE_COMMENT';
const INIT_COMMENT = 'comment/INIT_COMMENT';

export const writeComment = createAction(WRITE_COMMENT, commentAPI.writeComment);
export const editComment = createAction(EDIT_COMMENT, commentAPI.editComment);
export const deleteComment = createAction(DELETE_COMMENT, commentAPI.deleteComment);
export const initialize = createAction(INIT_COMMENT);

const initialState = {
  comment: null,
  error: null,
};

export default handleActions(
  {
    [INIT_COMMENT]: (state) => initialState,
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
