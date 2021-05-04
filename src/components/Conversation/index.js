import { useEffect, useState } from "react";
import { Avatar } from "antd";
import moment from "moment";
import "moment/locale/ru";
import "antd/dist/antd.css";
import "./styles.scss";

export default function Conversation({ user }) {
  const [time, setTime] = useState(moment(user.date).fromNow());

  const interval = setInterval(() => {
    setTime((time) => (time = moment(user.date).fromNow()));
  }, 1000);

  useEffect(() => clearInterval(interval));

  return (
    <div className="container">
      <div className="conv">
        <div className="conv_img">
          <Avatar size={50} src={user.avatar} />
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
