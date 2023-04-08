import { combineReducers } from "redux";
import newsReducer from "./slices/newsSlice";

const rootReducer = combineReducers({
  news: newsReducer,
});

export default rootReducer;
