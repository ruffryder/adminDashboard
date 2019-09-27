import { combineReducers } from "redux";
import courses from "./courseReducers";
import authors from "./authorReducer";
import apiCallsInProgress from "./apiStatusReducer";
const rootReducer = combineReducers({
  courses,
  authors,
  apiCallsInProgress
});

export default rootReducer;
