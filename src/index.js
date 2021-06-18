import { StrictMode } from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";

import { store } from "./store/store.js";

import App from "./App";

import { messageListDownload } from "./store/messageReducer.js";

store.dispatch(messageListDownload);

const rootElement = document.getElementById("root");
ReactDOM.render(
  // <StrictMode>
  <Provider store={store}>
    <App />
  </Provider>,
  // </StrictMode>,
  rootElement
);
