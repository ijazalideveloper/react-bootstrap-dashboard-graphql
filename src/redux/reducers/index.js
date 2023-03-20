import { combineReducers } from "redux";

import authReducer from "./authReducer";
import classReducer from "./classReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  classes: classReducer,
});

export default rootReducer;
