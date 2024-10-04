import { all, fork } from "redux-saga/effects";
import axios from "axios";
import arrSaga from "./arr";
import { API_URL } from "../constants";

axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(arrSaga),
  ]);
}
