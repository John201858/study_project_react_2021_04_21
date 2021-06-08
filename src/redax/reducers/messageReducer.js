import users from "../../../users.json";
import { INCREMENT, DECREMENT } from "../constants";

const initialState = {
  count: 0
};

export default function messageReducer(state = initialState, action) {
  switch (action.type) {
    // case 'messageIsRead': {
    //   return {
    //     ...state,
    //     isRead: !state.isRead
    //   }
    // }
    // case 'isMe': {
    //   return {
    //     ...state,
    //     isActive: !state.isActive
    //   }
    // }

    case INCREMENT:
      return { ...state, count: state.count++ };
    case DECREMENT:
      return { ...state, count: state.count-- };
    default:
      return state;
  }
}
