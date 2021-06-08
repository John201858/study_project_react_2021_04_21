import { createStore } from "redux";
import messageReducer from "./messageReducer.js";

export const store = createStore(messageReducer);
