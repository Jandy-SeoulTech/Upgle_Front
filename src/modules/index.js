import { combineReducers } from "redux";
import posts, { postsSaga } from "./posts";
import loading from "./loading";
import { all } from "redux-saga/effects";

const rootReducer = combineReducers({
  posts,
  loading,
});

export function* rootSaga() {
  yield all([postsSaga()]);
}

export default rootReducer;
