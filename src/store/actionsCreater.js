import { MESSAGE_SEND, MESSAGE_DELETE } from "./types";

function sendMessage(message) {
  return {
    type: MESSAGE_SEND,
    payload: message
  };
}

function deleteMessage(id) {
  return {
    type: MESSAGE_DELETE,
    payload: id
  };
}

export { sendMessage, deleteMessage };
