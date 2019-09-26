import { combineReducers } from "redux";
import courses from "./courseReducers";

const rootReducer = combineReducers({
  courses
});

export default rootReducer;
