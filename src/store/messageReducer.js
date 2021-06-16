import users from "../../../users.json";
import { MESSAGE_SEND, MESSAGE_DELETE, MESSAGE_EDIT, MESSAGE_LOADING, MESSAGE_COMPLETED } from "./types";

import { messageLoading, messageCompleted } from "./actionsCreater";

const initialState = {
  users: [],
  status: ""
};

export default function messageReducer(state = initialState, action) {
  switch (action.type) {
    case MESSAGE_SEND:
      return {
        ...state,
        users: state.users.concat(action.payload)
      };
    case MESSAGE_DELETE:
      return {
        ...state,
        users: state.users.filter(message => message._id !== action.payload)
      };
    case MESSAGE_EDIT:
      return {
        ...state,
        users: state.users.map(message => {
          if (message._id === action.payload.id) {
            message.text = action.payload.text
          }
          return message
        })
      }
    case MESSAGE_LOADING:
      return {
        ...state,
        status: action.payload
      }
    case MESSAGE_COMPLETED:
      return {
        ...state,
        users: action.payload.obj,
        status: action.payload.status
      }
    default:
      return state;
  }
}

export function messageLoaded(dispatch, getState) {
  dispatch(messageLoading("loading"));
  setInterval(() => {
    dispatch(messageCompleted(users, "loaded"));
  }, 60000);
  
}
