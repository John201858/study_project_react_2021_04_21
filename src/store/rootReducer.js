import { combineReducers } from "redux";
import messageReducer from "./messageReducer.js";

export const rootReducer = combineReducers({
  message: messageReducer
  // lading: loadingReducer
})