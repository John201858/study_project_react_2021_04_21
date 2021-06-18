import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./messageReducer.js";

export const store = configureStore({
  reducer: {
    message: messageReducer
  }
});
