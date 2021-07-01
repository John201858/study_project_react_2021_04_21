import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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

export const conversationListDownload = async (dispatch, getState) => {
  dispatch(conversationListLoading());
  const response = await axios.get(
    `https://api.json-generator.com/templates/R6-T7jC5AbYz/data?access_token=jh675lhpsw77ljzar3bkf09sibkpkp3zotykb3qu`
  );
  try {
    dispatch(conversationListCompleted(response.data.conversations));
  } catch (err) {
    console.log(err);
  }
};

export const ConversationId = (state, id) =>
  state.items.find((item) => item._id === id);

export const {
  conversationListLoading,
  conversationListCompleted,
  selectedConversation
} = conversationReducer.actions;

export default conversationReducer.reducer;
