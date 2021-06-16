import { MESSAGE_SEND, MESSAGE_DELETE, MESSAGE_EDIT, MESSAGE_LOADING, MESSAGE_COMPLETED } from "./types";

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

function messageLoading(status) {
  return {
    type: MESSAGE_LOADING,
    payload: status
  }
}

function messageCompleted(obj, status) {
  return {
    type: MESSAGE_COMPLETED,
    payload: {obj, status}
  }
}

export { sendMessage, deleteMessage, editMessage, messageLoading, messageCompleted };
