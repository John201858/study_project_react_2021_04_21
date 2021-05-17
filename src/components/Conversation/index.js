import { useEffect, useState } from "react";
// import { Avatar } from "antd";
import moment from "moment";
import "moment/locale/ru";
// import "antd/dist/antd.css";
import "./Conversation.scss";
import classNames from "classnames";

export default function Conversation({ user, selection }) {
  const [time, setTime] = useState(moment(user.date).calendar());

  const interval = setInterval(() => {
    setTime((time) => (time = moment(user.date).calendar()));
  }, 1000);

  useEffect(() => clearInterval(interval));

  return (
    <div
      className={classNames("container", {
        "border-select": user._id === selection
      })}
      id={user._id}
    >
      <div className="conv">
        <div className="conv_img">
          <img src={user.avatar} alt={`Avatar ${user.name}`} />
        </div>

        <div className="conv_content">
          <div className="convLine">
            <span className="convLine_Name">{user.name}</span>
            <span className="convLine_date">{time}</span>
          </div>
          <div className="convLine">
            <span className="convLine_text">{user.text}</span>
            {user.isRead && (
              <span className="convLine_count">{user.numbMessage}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
