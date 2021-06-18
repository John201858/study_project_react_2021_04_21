import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";

import users from "../../../users.json";

const initialState = {
  items: [],
  status: ""
};

const messageReducer = createSlice({
  name: "message",
  initialState,
  reducers: {
    sendMessage: {
      reducer(state, action) {
        state.items = state.items.concat(action.payload);
      },
      prepare(id, text, date) {
        return {
          payload: {
            _id: id,
            isMe: true,
            avatar: "https://loremflickr.com/320/240?random",
            name: "Me",
            text,
            date,
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
      state.items = state.items.map((message) => {
        if (message._id === id) {
          message.text = text;
        }
        return message;
      });
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
      state.items = state.items.map((message) => {
        if (message._id === action.payload) {
          message.messageStatus = "loading";
        }
        return message;
      });
    },
    messageCompleted(state, action) {
      state.items = state.items.map((message) => {
        if (message._id === action.payload) {
          message.messageStatus = "fulfilled";
        }
        return message;
      });
    }
  }
});

export function messageListDownload(dispatch, getState) {
  dispatch(messageListLoading());
  setTimeout(() => {
    dispatch(messageListCompleted(users));
  }, 5000);
}

export const sendServerMessage = (id, text, date) => (dispatch, getState) => {
  dispatch(sendMessage(id, text, date));
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
