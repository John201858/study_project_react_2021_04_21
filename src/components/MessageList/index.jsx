import { useState } from "react";
import Message from "../Message";
import sortBy from "lodash/sortBy";
import {
  SendOutlined,
  AudioOutlined,
  CameraOutlined,
  SmileOutlined
} from "@ant-design/icons";
import "./MessageList.scss";

export default function MessageList({ user }) {
  const [change, setChange] = useState("");
  const u = sortBy(user, obj => new Date(obj.date)).reverse();
  console.log(u);

  const data = user.map((user) => (
    <Message
      user={user}
      avatar={user.avatar}
      name={user.name}
      isMe={user.isRead}
      text={user.text}
      date={user.date}
      isRead={user.isActive}
      attachmens={user.attachmens}
      isOnline={user.isActive}
    />
  ));

  return (
    <section className="messageList">
      <div className="messageList__header">
        <div className="messageList__header-user">
          <img src={user[0].avatar} alt={`Avatar ${user[0].name}`} />
          <p>{user[0].name}</p>
        </div>
      </div>
      <div className="messageList__content">{data}</div>
      <div className="messageList__input">
        <SmileOutlined className="messageList__input-icon" />
        <input
          onChange={(event) => setChange(event.target.value)}
          type="text"
          placeholder="Введите сообщение..."
        ></input>
        <CameraOutlined className="messageList__input-icon" />
        {change ? (
          <SendOutlined className="messageList__input-icon" />
        ) : (
          <AudioOutlined className="messageList__input-icon" />
        )}
      </div>
    </section>
  );
}
