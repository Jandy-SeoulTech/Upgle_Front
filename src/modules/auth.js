import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/util/createRequestSaga';
import * as authAPI from '../lib/api/auth';
import { takeLatest } from 'redux-saga/effects';

const [SIGNIN, SIGNIN_SUCCESS, SIGNIN_FAILURE] =
  createRequestActionTypes('auth/LOGIN');
const INIT_AUTH = 'auth/INIT_AUTH';

export const signin = createAction(SIGNIN, ({ email, password }) => ({
  email,
  password,
}));
export const initAuth = createAction(INIT_AUTH);

const signinSaga = createRequestSaga(SIGNIN, authAPI.signin);
export function* authSaga() {
  yield takeLatest(SIGNIN, signinSaga);
}

const initialState = {
  auth: null,
  error: null,
};

const posts = handleActions(
  {
    [SIGNIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      auth,
    }),
    [SIGNIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [INIT_AUTH]: () => initialState,
  },
  initialState,
);

export default posts;
