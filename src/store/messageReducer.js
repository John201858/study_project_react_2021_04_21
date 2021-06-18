import { createSlice } from "@reduxjs/toolkit";

import users from "../../../users.json";
// import { MESSAGE_SEND, MESSAGE_DELETE, MESSAGE_EDIT, MESSAGE_LIST_LOADING, MESSAGE_LIST_COMPLETED } from "./types";

// import { messageListLoading, messageListCompleted } from "./actionsCreater";

const initialState = {
  items: users
  // status: ""
};

const messageReducer = createSlice({
  name: "message",
  initialState,
  reducers: {
    sendMessage(state, action) {
      state.items.concat(action.payload);
    },
    deleteMessage(state, action) {
      const id = action.payload;
      state.items.filter((message) => message._id !== id);
    },
    editMessage(state, action) {
      const { id, text } = action.payload;
      state.items = state.items.map((message) => {
        if (message._id === id) {
          message.text = text;
        }
        return message;
      });
    }
    // messageListLoading(state, action) {
    //   state.status = action.payload;
    // },
    // messageListCompleted: {
    //   reduser (state, action) {
    //     const {messages, status} = action.payload;
    //     state.items = messages;
    //     state.status = status;
    //   },
    //   prepare(messages, status) {
    //     return {
    //       payload: {messages, status}
    //     }
    //   }
    // }
  }
});

// export default function messageReducer(state = initialState, action) {
//   switch (action.type) {
//     case MESSAGE_SEND:
//       return {
//         ...state,
//         items: state.items.concat(action.payload)
//       };
//     case MESSAGE_DELETE:
//       return {
//         ...state,
//         items: state.items.filter(message => message._id !== action.payload)
//       };
//     case MESSAGE_EDIT:
//       return {
//         ...state,
//         items: state.items.map(message => {
//           if (message._id === action.payload.id) {
//             message.text = action.payload.text
//           }
//           return message
//         })
//       }
//     case MESSAGE_LIST_LOADING:
//       return {
//         ...state,
//         status: action.payload
//       }
//     case MESSAGE_LIST_COMPLETED:
//       return {
//         ...state,
//         items: action.payload.obj,
//         status: action.payload.status
//       }
//     default:
//       return state;
//   }
// }

// export function messageListDownload(dispatch, getState) {
//   dispatch(messageListLoading("loading"));
//   setInterval(() => {
//     dispatch(messageListCompleted(users, "loaded"));
//   }, 5000);
// }

export const {
  sendMessage,
  deleteMessage,
  editMessage,
  messageListLoading,
  messageListCompleted
} = messageReducer.actions;

export default messageReducer.reducer;
// export messageSendServer = message => (dispatch, getState) => {
//   getState().
// }
