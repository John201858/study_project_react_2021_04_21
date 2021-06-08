// import Message from "./components/Message.js";
import "./styles.css";
import users from "../users.json";
import { ConvList, MessageList } from "./components";
// import { store } from "./store/store.js";
import { connect } from "react-redux";
import { increment, decrement } from "./store/actionsCreater.js";

function App({ count, dispatch }) {
  return (
    <div className="App">
      {/* <ConvList users={users} />
      <MessageList user={users} /> */}
      <div>{count}</div>
      <button onClick={() => dispatch(increment())}>Увеличить</button>
      <button onClick={() => dispatch(decrement())}>Уменьшить</button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { count: state.count };
};

export default connect(mapStateToProps)(App);
