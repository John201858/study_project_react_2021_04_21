import { useEffect, useState } from "react";
import moment from "moment";
import CheckRead from "../CheckRead";
import "moment/locale/ru";
import "./Conversation.scss";
import classNames from "classnames";

export default function Conversation({ user, selection }) {
  const [time, setTime] = useState(moment(user.date).calendar());

  const interval = setInterval(() => {
    setTime((time) => (time = moment(user.date).calendar()));
  }, 1000);

  useEffect(() => clearInterval(interval));

  const isMe = user.isActive;
  const isOnline = user.isActive;

  return (
    <div
      className={classNames("container", {
        select: user._id === selection
      })}
      id={user._id}
    >
      <div className="conversation">
        <div className={classNames("conversation__avatar", {
          "conversation__avatar--online": isOnline})}>
          <img src={user.avatar} alt={`Avatar ${user.name}`} />
        </div>

        <div className="conversation__data">
          <div className="conversation__data-user">
            <p>{user.name}</p>
            <span>{time}</span>
          </div>
          <div className="conversation__data-text">
            <p>{user.text}</p>
            {(isMe && <CheckRead isRead={user.isRead} />) ||
              (user.isRead && (
                <span className="conversation__data-text--count">
                  {user.numbMessage > 9 ? "9+" : user.numbMessage}
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
