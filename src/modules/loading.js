/**
 * createRequestSaga에서 호출되며 액션이 발생했을 때 액션의 타입을 payload로 받습니다.
 * 해당 액션이 처리되기 전 startLoading, 액션이 종료되면 finishLoading 액션을 실행하여
 * 액션이 처리되는 과정을 확인할 수 있습니다.
 * 추후 액션이 끝날 때까지 기다린 후 다른 액션을 발생하는 등의 작업이 가능합니다.
 */
import { createAction, handleActions } from "redux-actions";

const START_LOADING = "loading/START_LOADING";
const FINISH_LOADING = "loading/FINISH_LOADING";

export const startLoading = createAction(
  START_LOADING,
  (requestType) => requestType
);

export const finishLoading = createAction(
  FINISH_LOADING,
  (requestType) => requestType
);

const initialState = {};

const loading = handleActions(
  {
    [START_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: true,
    }),
    [FINISH_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: false,
    }),
  },
  initialState
);

export default loading;
