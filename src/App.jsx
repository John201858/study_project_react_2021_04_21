// import Message from "./components/Message.js";
import "./styles.css";
import users from "../users.json";
import { ConvList, MessageList } from "./components";

export default function App() {
  return (
    <div className="App">
      {/* <ConvList users={users} /> */}
      <MessageList user={users} />
    </div>
  );
}
