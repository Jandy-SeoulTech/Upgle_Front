import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/util/createRequestSaga";
import * as postsAPI from "../lib/api/posts";
import { takeLatest } from "redux-saga/effects";

const [GET_POST_LIST, GET_POST_LIST_SUCCESS, GET_POST_LIST_FAILURE] =
  createRequestActionTypes("posts/GET_POST_LIST");

export const getPostList = createAction(GET_POST_LIST);

const getPostListSaga = createRequestSaga(GET_POST_LIST, postsAPI.getPostList);
export function* postsSaga() {
  yield takeLatest(GET_POST_LIST, getPostListSaga);
}

const initialState = {
  postList: null,
  error: null,
};

const posts = handleActions(
  {
    [GET_POST_LIST_SUCCESS]: (state, { payload: postList }) => ({
      ...state,
      postList,
    }),
    [GET_POST_LIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState
);

export default posts;
