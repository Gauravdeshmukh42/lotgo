import {combineReducers} from 'redux';
import newsReducer from './slices/newsSlice';
import bookmarkReducer from './slices/bookmarkSlice';
const rootReducer = combineReducers({
  news: newsReducer,
  bookmark: bookmarkReducer,
});

export default rootReducer;
