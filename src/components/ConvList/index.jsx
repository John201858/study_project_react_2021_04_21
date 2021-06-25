import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

import {
  conversationListDownload,
  conversationId
} from "../../store/conversationReducer";

import Conversation from "../Conversation";

import sortBy from "lodash/sortBy";
import { Button, Empty, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import "antd/dist/antd.css";
import "./ConvList.scss";

export default function ConvList() {
  const [selection, setSelection] = useState("");

  const items = useSelector((state) => state.conversation.items);
  const status = useSelector((state) => state.conversation.status);
  // const messages = useSelector(state => conversationId(state.conversation, selection));
  const dispatch = useDispatch();

  const sort = sortBy(items, (item) => new Date(item.date)).reverse();

  const [filtred, setFiltred] = useState(Array.from(sort));

  useEffect(() => {
    if (status === "idle") {
      dispatch(conversationListDownload);
    }
    if (sort) {
      setFiltred(sort);
    }
  }, [status, dispatch]);

  const selectedConvId = (id) => {
    setSelection(id);
  };

  const filtration = (value) => {
    setFiltred(
      sort.filter(
        (data) => data.name.toLowerCase().indexOf(value.toLowerCase()) >= 0
      )
    );
  };

  return (
    <div className="convList">
      <div className="convList__header">
        <div className="convList__header-top">
          <p>Диалоги ({filtred.length})</p>
          <Button className="convList__header-top--button" type="primary">
            Новый диалог
          </Button>
        </div>
        <div className="convList__header-bottom">
          <input
            onChange={(event) => filtration(event.target.value)}
            type="text"
            placeholder="Поиск диалогов..."
          ></input>
          <SearchOutlined />
        </div>
      </div>
      <div className="convList__container">
        {status === "loading" && (
          <Spin
            className="convList__container-loading"
            size="large"
            tip="Загрузка бесед..."
          />
        )}
        {filtred.length ? (
          filtred.map((item) => (
            <Conversation
              key={item._id}
              item={item}
              date={item.date}
              isMe={item.isActive}
              isOnline={item.isRead}
              isRead={item.isRead}
              numbMessage={item.numbMessage}
              name={item.name}
              avatar={item.avatar}
              text={item.text}
              isNewMessageRead={item.isRead}
              selection={selection}
              selectedConvId={selectedConvId}
            />
          ))
        ) : (
          <div className="convList__container-empty">
            <Empty
              style={{ color: "rgba(71, 84, 102, 0.7)" }}
              description="Нет бесед"
            />
          </div>
        )}
      </div>
    </div>
  );
}
