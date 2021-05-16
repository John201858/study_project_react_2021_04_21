// import Message from "./components/Message.js";
import "./styles.css";
import users from "../users.json";
import { ConvList, Message } from "./components";

export default function App() {
  return (
    <div className="App">
      {/* <ConvList users={users} /> */}
      <Message user={users[0]} />
      <Message user={users[1]} />
      <Message user={users[2]} />
      <Message user={users[3]} />
      {/* <Conversation user={users[0]} selection={selection} />
      <Conversation user={users[1]} selection={selection} />
      <Conversation user={users[2]} selection={selection} />
      <Conversation user={users[3]} selection={selection} />
      <Conversation user={users[4]} selection={selection} />
      <Conversation user={users[5]} selection={selection} /> */}
    </div>
  );
}
