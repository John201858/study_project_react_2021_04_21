// import Message from "./components/Message.js";
import "./styles.css";
import { ConvList, MessageList, FileUpload } from "./components";
import { useState } from "react";

export default function App() {
  return (
    <div className="App">
      {/* <ConvList users={users} />*/}
      <MessageList />
    </div>
  );
}
