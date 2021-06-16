import { useState, useRef, useEffect } from "react";

import { connect } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

import { Empty } from "antd";
import {
  sendMessage,
  deleteMessage,
  editMessage
} from "../../store/actionsCreater.js";

import {
  SendOutlined,
  AudioOutlined,
  CameraOutlined,
  SmileOutlined,
  CheckCircleOutlined
} from "@ant-design/icons";

import Message from "../Message";
import "./MessageList.scss";
import autoResizeTexarea from "../../otherFunction/autoResizeTextarea.js";

function MessageList({ user, dispatch }) {
  const [change, setChange] = useState("");
  const [scroll, setScroll] = useState(null);
  const [checkEventEdit, setCheckEventEdit] = useState({
    flag: false,
    id: null
  });
  const scrollMessageList = useRef(null);
  const refTextarea = useRef(null);

  useEffect(() => {
    scrollMessageList.current.scrollTop = scroll;
  }, [scroll]);

  useEffect(() => {
    autoResizeTexarea(refTextarea.current);
  });

  const send = () => {
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
    setScroll(scrollMessageList.current.scrollHeight);
    setChange("");
  };

  const editedMessage = () => {
    change !== ""
      ? dispatch(editMessage({ id: checkEventEdit.id, text: change }))
      : dispatch(deleteMessage(checkEventEdit.id));
    setCheckEventEdit({ flag: false });
    setChange("");
  };

  const refDeleteMessage = (id) => {
    dispatch(deleteMessage(id));
  };

  const refEditMessage = (content) => {
    setChange(content.text);
    refTextarea.current.select();
    setCheckEventEdit({ flag: true, id: content.id });
  };

  const data = user.map((user) => (
    <Message
      id={user._id}
      key={user._id}
      avatar={user.avatar}
      name={user.name}
      isMe={user.isRead}
      text={user.text}
      date={user.date}
      isRead={user.isActive}
      attachmens={user.attachmens}
      isOnline={user.isActive}
      loading={user.isActive}
      blockDeleteMessage={checkEventEdit.flag}
      refDeleteMessage={refDeleteMessage}
      refEditMessage={refEditMessage}
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
      <div ref={scrollMessageList} className="messageList__content">
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
          rows="1"
          value={change}
          ref={refTextarea}
          onChange={(event) => {
            setChange(event.target.value);
          }}
          placeholder="Введите сообщение..."
        ></textarea>
        <CameraOutlined className="messageList__input-icon" />
        {checkEventEdit.flag ? (
          <CheckCircleOutlined
            onClick={editedMessage}
            className="messageList__input-icon"
          />
        ) : change ? (
          <SendOutlined onClick={send} className="messageList__input-icon" />
        ) : (
          <AudioOutlined className="messageList__input-icon" />
        )}
      </div>
    </section>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.message.users
  };
};

export default connect(mapStateToProps)(MessageList);
