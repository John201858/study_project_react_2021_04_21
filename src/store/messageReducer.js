import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";

import users from "../../../users.json";

const initialState = {
  items: null,
  status: "idle"
};

const messageReducer = createSlice({
  name: "message",
  initialState,
  reducers: {
    sendMessage: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare(id, text, attachmens) {
        return {
          payload: {
            _id: id,
            isMe: true,
            avatar: "https://loremflickr.com/320/240?random",
            name: "Me",
            text,
            attachmens,
            date: new Date(),
            isRead: true,
            isOnline: true
          }
        };
      }
    },
    deleteMessage(state, action) {
      const id = action.payload;
      state.items = state.items.filter((message) => message._id !== id);
    },
    editMessage(state, action) {
      const { id, text } = action.payload;
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
    messageListCompleted(state, action) {
      state.items = action.payload;
      state.status = "fulfilled";
    },
    messageLoading(state, action) {
      const message = state.items.find(
        (message) => message._id === action.payload
      );
      if (message) {
        message.messageStatus = "loading";
      }
    },
    messageCompleted(state, action) {
      const message = state.items.find(
        (message) => message._id === action.payload
      );
      if (message) {
        message.messageStatus = "fulfilled";
      }
    }
  }
});

export function messageListDownload(dispatch, getState) {
  dispatch(messageListLoading());
  setTimeout(() => {
    dispatch(messageListCompleted(users));
  }, 5000);
}

export const sendServerMessage = (id, text, attachmens) => (dispatch, getState) => {
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
