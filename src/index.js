import { StrictMode } from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";

import { store } from "./store/store.js";

import App from "./App";

import { messageLoaded } from "./store/messageReducer.js";

store.dispatch(messageLoaded);

const rootElement = document.getElementById("root");
ReactDOM.render(
  // <StrictMode>
  <Provider store={store}>
    <App />
  </Provider>,
  // </StrictMode>,
  rootElement
);
