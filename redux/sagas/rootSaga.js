import { all } from "redux-saga/effects";
import studentSaga from "./studentsSaga";

function*rooSaga(){
   return yield all([studentSaga ()])
}
export default rooSaga;
