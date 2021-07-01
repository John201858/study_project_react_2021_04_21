import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: null,
  status: "idle"
};

const messageReducer = createSlice({
  name: "message",
  initialState,
  reducers: {
    sendMessage: {
      reducer(state, { payload }) {
        state.items.push(payload);
      },
      prepare(id, text, attachmens) {
        return {
          payload: {
            _id: id,
            isMe: true,
            avatar: "https://loremflickr.com/320/240?random",
            name: "Вы",
            text,
            attachmens,
            date: new Date(),
            isRead: true,
            isOnline: true
          }
        };
      }
    },
    deleteMessage(state, { payload }) {
      state.items = state.items.filter((message) => message._id !== payload);
    },
    editMessage(state, { payload }) {
      const { id, text } = payload;
      const message = state.items.find((message) => message._id === id);
      if (message) {
        message.text = text;
      }
    },
    // extraRedusers: builder => {
    //   builder
    //     .addCase(messageList.download, (state, action) => {
    //       state.status = 'loading';
    //     })
    //     .addCase(messageList.fulfilled, (state, action) => {
    //       const message = action.payload;
    //       state.status = 'fulfilled';
    //       state.items = message;
    //     })
    // },
    messageListLoading(state, action) {
      state.status = "loading";
    },
    messageListCompleted(state, { payload }) {
      const { id, conversations } = payload;
      const conversation = conversations.find(
        (conversation) => conversation._id === id
      );
      if (conversation) {
        state.items = conversation.messages.items;
      } else {
        state.items = [];
      }
      state.status = "fulfilled";
    },
    messageLoading(state, { payload }) {
      const message = state.items.find((message) => message._id === payload);
      if (message) {
        message.messageStatus = "loading";
      }
    },
    messageCompleted(state, { payload }) {
      const message = state.items.find((message) => message._id === payload);
      if (message) {
        message.messageStatus = "fulfilled";
      }
    }
  }
});

export const messageListDownload = (id) => async (dispatch, getState) => {
  dispatch(messageListLoading());
  const response = await axios.get(
    `https://api.json-generator.com/templates/R6-T7jC5AbYz/data?access_token=jh675lhpsw77ljzar3bkf09sibkpkp3zotykb3qu`
  );
  // jh675lhpsw77ljzar3bkf09sibkpkp3zotykb3qu
  try {
    dispatch(
      messageListCompleted({ id, conversations: response.data.conversations })
    );
  } catch (err) {
    console.log(err);
  }
};

export const sendServerMessage = (id, text, attachmens) => (
  dispatch,
  getState
) => {
  dispatch(sendMessage(id, text, attachmens));
  dispatch(messageLoading(id));
  setTimeout(() => {
    dispatch(messageCompleted(id));
  }, 5000);
};

// export const messageList = createAsyncThunk("messages/list", (message) => {
//   setTimeout(() => {
//     return message;
//   }, 5000);
// });

export const lastMessage = (state, id) =>
  state.items.find((message) => message._id === id);

export const {
  sendMessage,
  deleteMessage,
  editMessage,
  messageListLoading,
  messageListCompleted,
  messageLoading,
  messageCompleted
} = messageReducer.actions;

export default messageReducer.reducer;
// export messageSendServer = message => (dispatch, getState) => {
//   getState().
// }
