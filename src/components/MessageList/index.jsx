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
import { conversationId } from "../../store/conversationReducer";

import {
  SendOutlined,
  AudioOutlined,
  CameraOutlined,
  SmileOutlined,
  CheckCircleOutlined
} from "@ant-design/icons";

import "emoji-mart/css/emoji-mart.css";
import { Picker, Emoji } from "emoji-mart";

import Message from "../Message";
import FileUpload from "../FileUpload";

import "./MessageList.scss";
import autoResizeTexarea from "../../otherFunction/autoResizeTextarea.js";

export default function MessageList() {
  const [change, setChange] = useState("");
  const [scroll, setScroll] = useState(null);
  const [files, setFiles] = useState();
  const [checkEventEdit, setCheckEventEdit] = useState({
    flag: false,
    id: null
  });
  const [attachmens, setAttachmens] = useState(null);
  const [emojiView, setEmojiView] = useState(false);
  const [emoji, setEmoji] = useState({});
  const scrollMessageList = useRef(null);
  const refTextarea = useRef(null);
  const items = useSelector((state) => state.message.items);
  const status = useSelector((state) => state.message.status);
  const selectedMessage = useSelector(
    (state) => state.conversation.selectedConversation
  );
  const dispatch = useDispatch();

  // console.log(files);
  console.log(selectedMessage);

  useEffect(() => {
    scrollMessageList.current.scrollTop = scroll;
  }, [scroll]);

  useEffect(() => {
    autoResizeTexarea(refTextarea.current);
  });

  useEffect(() => {
    if (selectedMessage) {
      dispatch(messageListDownload(selectedMessage));
    }
  }, [selectedMessage, dispatch]);

  const getContentBox = (content) => {
    setAttachmens(content);
    console.log(content);
  };

  const updateUploadedFiles = (file) => {
    setFiles(file);
  };

  const send = () => {
    // const filesURL = files.map((file) => URL.createObjectURL(file));

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
    const { id, text } = content;
    setChange(text);
    refTextarea.current.select();
    setCheckEventEdit({ flag: true, id });
  };

  let data;

  if (items) {
    if (items.length < 1) {
      data = (
        <div className="messageList__content-empty">
          <Empty
            style={{ color: "rgba(71, 84, 102, 0.7)" }}
            description="Нет сообщений"
          />
        </div>
      );
    } else {
      data = items.map((item) => (
        <Message
          id={item._id}
          key={item._id}
          avatar={item.avatar}
          name={item.name}
          isMe={item.isMe}
          text={item.text}
          date={item.date}
          isRead={item.isRead}
          attachmens={item.attachmens}
          isOnline={item.isOnline}
          loading={item.messageStatus === "loading"}
          error={false}
          blockEditMessage={checkEventEdit.flag}
          refDeleteMessage={refDeleteMessage}
          refEditMessage={refEditMessage}
        />
      ));
    }
  } else {
    data = (
      <div className="messageList__content-empty">
        <Empty
          style={{ color: "rgba(71, 84, 102, 0.7)" }}
          description="Выберите беседу"
        />
      </div>
    );
  }

  console.log(items);

  return (
    <section className="messageList">
      <div className="messageList__header">
        <div className="messageList__header-user">
          {status === "loading" ? (
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
            items &&
            (items.length < 1 ? (
              <>
                <Skeleton.Avatar className="messageList__header-user_sceletAvatar" />
                <Skeleton.Input className="messageList__header-user_sceletText" />
              </>
            ) : (
              <>
                <img src={items[0].avatar} alt={`Avatar ${items[0].name}`} />
                <p>{items[0].name}</p>
              </>
            ))
          )}
        </div>
      </div>
      <div ref={scrollMessageList} className="messageList__content">
        {status === "loading" ? (
          <Spin
            className="messageList__content-loading"
            size="large"
            tip="Загрузка сообщений..."
          />
        ) : (
          data
        )}
      </div>
      <div className="messageList__input">
        <SmileOutlined
          onClick={() => setEmojiView(!emojiView)}
          className="messageList__input-icon"
        />
        {emojiView && (
          <Picker
            style={{
              position: "absolute",
              bottom: "65px",
              left: "20px"
            }}
            sheetSize="32"
            onClick={(emoji, event) => {
              setEmojiView(false);
              setEmoji(emoji);
              setChange((change) => change + emoji.native);
            }}
          />
        )}
        <textarea
          rows="1"
          value={change}
          ref={refTextarea}
          onChange={(event) => {
            setChange(event.target.value);
          }}
          placeholder="Введите сообщение..."
        ></textarea>
        {/* <FileUpload
          accept=".jpg,.png,.jpeg"
          label="Profile Image(s)"
          multiple
          updateFilesCb={updateUploadedFiles}
          getContentBox={getContentBox}
        /> */}
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
      {attachmens}
    </section>
  );
}
