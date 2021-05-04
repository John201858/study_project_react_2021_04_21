import { useEffect, useState } from "react";
import { Avatar } from "antd";
import moment from "moment";
import "moment/locale/ru";
import "antd/dist/antd.css";
import "./styles.scss";

export default function Conversation({ user, date }) {
  const [time, setTime] = useState(moment(date).fromNow());

  const interval = setInterval(() => {
    setTime((time) => (time = moment(date).fromNow()));
  }, 1000);

  useEffect(() => clearInterval(interval));

  return (
    <div className="container">
      <div className="conv">
        <div className="conv_img">
          <Avatar size={50} src={user.imgUrl} />
        </div>

        <div className="conv_content">
          <div className="convLine">
            <span className="convLine_Name">{user.name}</span>
            <span className="convLine_date">{time}</span>
          </div>
          <div className="convLine">
            <span className="convLine_text">{user.text}</span>
            {true && <span className="convLine_count">{user.age}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
