import { useState } from "react";
import Conversation from "../Conversation";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import 'antd/dist/antd.css';
import "./ConvList.scss";

export default function ConvList({ users }) {
  const [selection, setSelection] = useState("");

  const headerClick = (event) => {
    console.log(event.target.closest("div[id]").id);
    setSelection(
      (selection) => (selection = event.target.closest("div[id]").id)
    );
  };

  const data = users.map((user) => (
    <Conversation user={user} selection={selection} />
  ));

  return (
    <div className="convList" onClick={headerClick}>
      <div className="convList__header">
        <div className="convList__header-top">
          <p>Диалоги ({data.length})</p>
          <Button className="convList__header-top--button" type="primary">Новый диалог</Button>
        </div>
        <div className="convList__header-bottom">
          <input type="text" placeholder="Поиск..."></input><SearchOutlined />
        </div>
      </div>
      <div className="convList__container">{data}</div>
    </div>
  );
}
