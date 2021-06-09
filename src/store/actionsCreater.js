import { MESSAGE_SEND } from "./types";

function sendMessage(message) {
  return {
    type: MESSAGE_SEND,
    payload: message
  };
}

export { sendMessage };
