import { useState } from "react";
import { connect } from "react-redux";
import Message from "../Message";
import { Empty } from "antd";
import { sendMessage } from "../../store/actionsCreater.js";
import { nanoid } from "@reduxjs/toolkit";

import {
  SendOutlined,
  AudioOutlined,
  CameraOutlined,
  SmileOutlined
} from "@ant-design/icons";
import "./MessageList.scss";

function MessageList({ user, dispatch }) {
  const [change, setChange] = useState("");

  const data = user.map((user) => (
    <Message
      key={user._id}
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
      <div className="messageList__content">
        {data || (
          <div className="messageList__content-empty">
            <Empty
              style={{ color: "rgba(71, 84, 102, 0.7)" }}
              description="Нет сообщений"
            />
          </div>
        )}
      </div>
      <div className="messageList__input">
        <SmileOutlined className="messageList__input-icon" />
        <textarea
          rows={change ? "3" : "1"}
          value={change}
          onChange={(event) => {
            event.target.style.height =
              (event.target.scrollHeight - 40) % 22 === 0
                ? event.target.scrollHeight + "px"
                : event.target.scrollHeight - 20 + "px";
            setChange(event.target.value);
          }}
          placeholder="Введите сообщение..."
        ></textarea>
        <CameraOutlined className="messageList__input-icon" />
        {change ? (
          <SendOutlined
            onClick={() => {
              dispatch(
                sendMessage({
                  _id: nanoid(),
                  isMe: true,
                  avatar: "https://loremflickr.com/320/240?random",
                  name: "Me",
                  text: change,
                  date: new Date(),
                  isRead: true,
                  isOnline: true
                })
              );

              setChange("");
            }}
            className="messageList__input-icon"
          />
        ) : (
          <AudioOutlined className="messageList__input-icon" />
        )}
      </div>
    </section>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    user: state.message.users
  };
};

export default connect(mapStateToProps)(MessageList);
