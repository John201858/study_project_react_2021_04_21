import { createSlice } from "@reduxjs/toolkit";

import users from "../../../users.json";

// import conversations from "../../../conversations.json";

const initialState = {
  items: null,
  status: "idle",
  selectedConversation: null
};

const conversationReducer = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    conversationListLoading(state, action) {
      state.status = "loading";
    },
    conversationListCompleted(state, { payload }) {
      state.items = payload;
      state.status = "fulfilled";
    },
    selectedConversation(state, { payload }) {
      state.selectedConversation = payload;
    }
    // selectConversationId(state, action) {
    //   const conversationId = state.items.find(
    //     (item) => item._id === action.payload
    //   );
    //   if (conversationId) {
    //   }
    // }
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
  conversationListCompleted,
  selectedConversation
} = conversationReducer.actions;

export default conversationReducer.reducer;
