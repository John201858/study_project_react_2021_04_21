// import Message from "./components/Message.js";
import "./styles.css";
import users from "../users.json";
import Conversation from "./components/Conversation";

export default function App() {
  return (
    <div className="App">
      {/* <Message user={users} /> */}
      <Conversation user={users[0]} date={"Tue May 04 2021 15:59:02"} />
    </div>
  );
}
