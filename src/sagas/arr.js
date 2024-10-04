import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
  LOAD_ARRS_REQUEST,
  LOAD_ARRS_SUCCESS,
  LOAD_ARRS_FAILURE,
  DOWN_ARRS_REQUEST,
  DOWN_ARRS_SUCCESS,
  DOWN_ARRS_FAILURE,
} from "../reducers/arr";

function loadArrsAPI() {
  return axios.get("/receive/load");
}
function* loadArrs() {
  try {
    const result = yield call(loadArrsAPI);
    yield put({
      type: LOAD_ARRS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_ARRS_FAILURE,
      error: err.response.data,
    });
  }
}
function* watchloadArrs() {
  yield takeLatest(LOAD_ARRS_REQUEST, loadArrs);
}

function downArrsAPI() {
  return axios.get("/receive/down");
}
function* downArrs() {
  try {
    const result = yield call(downArrsAPI);
    yield put({
      type: DOWN_ARRS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DOWN_ARRS_FAILURE,
      error: err.response.data,
    });
  }
}
function* watchdownArrs() {
  yield takeLatest(DOWN_ARRS_REQUEST, downArrs);
}


export default function* arrSaga() {
  yield all([
    fork(watchloadArrs),
    fork(watchdownArrs),
  ]);
}
