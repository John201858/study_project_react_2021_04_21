import {
  MESSAGE_SEND,
  MESSAGE_DELETE,
  MESSAGE_EDIT,
  MESSAGE_LIST_LOADING,
  MESSAGE_LIST_COMPLETED
} from "./types";

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

function messageListLoading(status) {
  return {
    type: MESSAGE_LIST_LOADING,
    payload: status
  };
}

function messageListCompleted(obj, status) {
  return {
    type: MESSAGE_LIST_COMPLETED,
    payload: { obj, status }
  };
}

export {
  sendMessage,
  deleteMessage,
  editMessage,
  messageListLoading,
  messageListCompleted
};
