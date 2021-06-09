import users from "../../../users.json";
import { MESSAGE_SEND } from "./types";

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
    default:
      return state;
  }
}
