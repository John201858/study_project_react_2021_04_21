import { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/ru";
import { Avatar } from "antd";
import classNames from "classnames";
import "antd/dist/antd.css";
import "./styles.scss";

export default function Message({ user }) {
  const [time, setTime] = useState(moment(user.date).fromNow());
  let ifMe = true;

  const interval = setInterval(() => {
    setTime((time) => (time = moment(user.date).fromNow()));
  }, 1000);

  useEffect(() => clearInterval(interval));

  return (
    <div className={classNames("message_container", { me: ifMe })}>
      <div className="col-avatar">
        <div className="avatar">
          <Avatar size={50} src={user.avatar} />
        </div>
      </div>

      <div className="col-content">
        <div className="content">
          <div className={classNames("content_user", { me: ifMe })}>
            <span className="content_user__name">{user.name}</span>
            <span className="content_user__date">{time}</span>
          </div>
          <div className={classNames("content_block", { border: ifMe })}>
            <span className="content_block__text">{user.text}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
