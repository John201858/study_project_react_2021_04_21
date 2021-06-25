import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";

import users from "../../../users.json";

const initialState = {
  items: null,
  status: "idle"
};

const conversationReducer = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    conversationListLoading(state, action) {
      state.status = "loading";
    },
    conversationListCompleted(state, action) {
      state.items = action.payload;
      state.status = "fulfilled";
    },
    selectConversationId(state, action) {
      const conversationId = state.items.find(
        (item) => item._id === action.payload
      );
      if (conversationId) {
      }
    }
  }
});

export function conversationListDownload(dispatch, getState) {
  dispatch(conversationListLoading());
  setTimeout(() => {
    dispatch(conversationListCompleted(users));
  }, 5000);
}

export const ConversationId = (state, id) =>
  state.items.find((item) => item._id === id);

export const {
  conversationListLoading,
  conversationListCompleted
} = conversationReducer.actions;

export default conversationReducer.reducer;
