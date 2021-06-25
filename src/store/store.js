import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./messageReducer";
import conversationReducer from "./conversationReducer";

export const store = configureStore({
  reducer: {
    message: messageReducer,
    conversation: conversationReducer
  }
});
