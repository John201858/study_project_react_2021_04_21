// import Message from "./components/Message.js";
import "./styles.css";
import users from "../users.json";
import { Conversation, Message } from "./components";

export default function App() {
  return (
    <div className="App">
      <Message user={users[0]} />
      <Message user={users[1]} />
      <Message user={users[2]} />
      <Message user={users[3]} />
      {/* <Conversation user={users[0]} />
      <Conversation user={users[1]} />
      <Conversation user={users[2]} />
      <Conversation user={users[3]} />
      <Conversation user={users[4]} />
      <Conversation user={users[5]} /> */}
    </div>
  );
}
