import users from "../../../users.json";
import { MESSAGE_SEND, MESSAGE_DELETE } from "./types";

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
    // case MESSAGE_DELETE:
    //   return {
    //     ...state,
    //     users: state.users
    //       // state.users._id.indexOf(action.payload) > -1 &&
    //       // state.users.splice(state.users._id.indexOf(action.payload), 1)
    //   };
    default:
      return state;
  }
}
