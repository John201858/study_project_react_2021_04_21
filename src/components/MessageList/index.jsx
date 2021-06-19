import { useState, useRef, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

import { Empty, Spin, Skeleton } from "antd";
import {
  deleteMessage,
  editMessage,
  sendServerMessage,
  messageListDownload
} from "../../store/messageReducer";

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

export default function MessageList() {
  const [change, setChange] = useState("");
  const [scroll, setScroll] = useState(null);
  const [checkEventEdit, setCheckEventEdit] = useState({
    flag: false,
    id: null
  });
  const scrollMessageList = useRef(null);
  const refTextarea = useRef(null);
  const items = useSelector((state) => state.message.items);
  const status = useSelector((state) => state.message.status);
  const dispatch = useDispatch();

  useEffect(() => {
    scrollMessageList.current.scrollTop = scroll;
  }, [scroll]);

  useEffect(() => {
    autoResizeTexarea(refTextarea.current);
  });

  useEffect(() => {
    if (status === "idle") {
      dispatch(messageListDownload);
    }
  }, [status, dispatch]);

  const send = () => {
    dispatch(sendServerMessage(nanoid(), change));
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

  const data = items.map((item) => (
    <Message
      id={item._id}
      key={item._id}
      avatar={item.avatar}
      name={item.name}
      isMe={item.isRead}
      text={item.text}
      date={item.date}
      isRead={item.isActive}
      attachmens={item.attachmens}
      isOnline={item.isActive}
      loading={item.messageStatus === "loading"}
      error={false}
      blockEditMessage={checkEventEdit.flag}
      refDeleteMessage={refDeleteMessage}
      refEditMessage={refEditMessage}
    />
  ));

  return (
    <section className="messageList">
      <div className="messageList__header">
        <div className="messageList__header-user">
          {(status === "loading") || (status === "idle") ? (
            <>
              <Skeleton.Avatar
                className="messageList__header-user_sceletAvatar"
                active
              />
              <Skeleton.Input
                className="messageList__header-user_sceletText"
                active
              />
            </>
          ) : (
            <>
              <img src={items[0].avatar} alt={`Avatar ${items[0].name}`} />
              <p>{items[0].name}</p>
            </>
          )}
        </div>
      </div>
      <div ref={scrollMessageList} className="messageList__content">
        {status === "loading" && (
          <Spin
            className="messageList__content-loading"
            size="large"
            tip="Загрузка..."
          />
        )}
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
