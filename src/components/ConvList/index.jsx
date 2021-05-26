import { useState } from "react";
import Conversation from "../Conversation";
import sortBy from "lodash/sortBy";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./ConvList.scss";

export default function ConvList({ users }) {
  const [selection, setSelection] = useState("");
  
  const sort = sortBy(
    users, data => new Date(data.date)
  ).reverse();

  const [filtred, setFiltred] = useState(Array.from(sort))

  const filtration = value => {
    setFiltred(
      sort.filter(
        data => data.name.toLowerCase().indexOf(value.toLowerCase()) >= 0
      )
    );
  }

  const headerClick = (event) => {
    console.log(event.target.closest("div[id]").id);
    setSelection(
      (selection) => (selection = event.target.closest("div[id]").id)
    );
  };

  return (
    <div className="convList" onClick={headerClick}>
      <div className="convList__header">
        <div className="convList__header-top">
          <p>Диалоги ({filtred.length})</p>
          <Button className="convList__header-top--button" type="primary">
            Новый диалог
          </Button>
        </div>
        <div className="convList__header-bottom">
          <input onChange={event => filtration(event.target.value)} type="text" placeholder="Поиск..."></input>
          <SearchOutlined />
        </div>
      </div>
      <div className="convList__container">
        {filtred.map((user) => (
          <Conversation
            key={user._id}
            user={user}
            date={user.date}
            isMe={user.isActive}
            isOnline={user.isRead}
            isRead={user.isRead}
            numbMessage={user.numbMessage}
            name={user.name}
            avatar={user.avatar}
            text={user.text}
            isNewMessageRead={user.isRead}
            selection={selection}
          />
        ))}
      </div>
    </div>
  );
}
