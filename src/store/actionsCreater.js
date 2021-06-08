import { INCREMENT, DECREMENT } from "./constants";

function isRead() {
  return {
    type: "messageIsRead"
  };
}

function isMe() {
  return {
    type: "isMe"
  };
}

function increment() {
  return { type: INCREMENT };
}

function decrement() {
  return { type: DECREMENT };
}

export { isRead, isMe, increment, decrement };
