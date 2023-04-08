import { all } from "redux-saga/effects";
import { newsSaga } from "./newsSaga";

const root = function* root() {
  yield all([newsSaga()]);
};

export default root;
