import { useState } from "react";
import Conversation from "../Conversation";
import "./ConvList.scss";

export default function ConvList({ users }) {
  const [selection, setSelection] = useState("");

  const headerClick = (event) => {
    console.log(event.target.closest("div[id]").id);
    setSelection(
      (selection) => (selection = event.target.closest("div[id]").id)
    );
  };

  const date = users.map((user) => (
    <Conversation user={user} selection={selection} />
  ));

  return (
    <div className="ConvList" onClick={headerClick}>
      {date}
    </div>
  );
}
