import { MESSAGE_SEND, MESSAGE_DELETE, MESSAGE_EDIT } from "./types";

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

function editMessage(content) {
  return {
    type: MESSAGE_EDIT,
    payload: content
  };
}

export { sendMessage, deleteMessage, editMessage };
