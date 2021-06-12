import users from "../../../users.json";
import { MESSAGE_SEND, MESSAGE_DELETE, MESSAGE_EDIT } from "./types";

const initialState = {
  users
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
    default:
      return state;
  }
}
