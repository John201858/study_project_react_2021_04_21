// import Message from "./components/Message.js";
import "./styles.css";
import { ConvList, MessageList, FileUpload } from "./components";
import { useState } from "react";

export default function App() {
  const [files, setFiles] = useState();

  const updateUploadedFiles = (file) => {
    setFiles(file);
    console.log(file);
  };

  return (
    <div className="App">
      {/* <ConvList users={users} />*/}
      {/* <MessageList /> */}
      <FileUpload
        accept=".jpg,.png,.jpeg,.txt"
        label="Profile Image(s)"
        multiple
        updateFilesCb={updateUploadedFiles}
      />
    </div>
  );
}
