import Message from "./components/Message.js";
import "./styles.css";
import users from "../users.json";

export default function App() {
  return (
    <div className="App">
      <h1>Лента новостей</h1>
      <Message user={users} />
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
