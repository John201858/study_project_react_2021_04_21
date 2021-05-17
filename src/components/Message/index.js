import { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/ru";
import classNames from "classnames";
import "./Message.scss";

export default function Message({ user }) {
  const [time, setTime] = useState(moment(user.date).fromNow());
  let ifMe = user.isRead;

  const interval = setInterval(() => {
    setTime((time) => (time = moment(user.date).fromNow()));
  }, 1000);

  useEffect(() => clearInterval(interval));

  return (
    <div className={classNames("message_block", { me: ifMe })}>
      <div className={classNames("message", { "message--ifMe": ifMe })}>
        <div className="message_avatar">
          <img src={user.avatar} alt={`Avatar ${user.name}`} />
        </div>
        <div className="message_content">
          <div className="message_content-user">
            <p>{user.name}</p>
            <span>{time}</span>
          </div>
          <div className="message_content-text">
            <p>{user.text}</p>
            {user.attachmens && (
              <div className="attachmens">
                {user.attachmens.map((attach) => (
                  <img src={attach} alt="attach" />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
