import { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/ru";
import classNames from "classnames";
import { CheckOutlined } from "@ant-design/icons";
import "./Message.scss";

export default function Message({ user }) {
  const [time, setTime] = useState(moment(user.date).fromNow());
  let isMe = user.isRead;

  const interval = setInterval(() => {
    setTime((time) => (time = moment(user.date).fromNow()));
  }, 1000);

  useEffect(() => clearInterval(interval));

  return (
    <div className={classNames("message__block", { me: isMe })}>
      <div className={classNames("message", { "message--isMe": isMe })}>
        <div className="message__avatar">
          <img src={user.avatar} alt={`Avatar ${user.name}`} />
        </div>
        <div className="message__content">
          <div className="message__content-user">
            <p>{user.name}</p>
            <span>
              {isMe && (
                <CheckOutlined
                  className={classNames("CheckOutlined", {
                    isRead: user.isActive
                  })}
                />
              )}
              {time}
            </span>
          </div>
          <div className="message__content-text">
            {user.text && <p>{user.text}</p>}
            {user.attachmens && (
              <div className="message__content-text--attachmens">
                {user.attachmens.map((attach) => (
                  <img src={attach} alt="Вложение: картинка" />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
