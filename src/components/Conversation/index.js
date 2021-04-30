import { Avatar } from "antd";
import moment from "moment";
import "moment/locale/ru";
import "antd/dist/antd.css";
import "./styles.scss";

export default function Conversation({ user }) {
  return (
    <div className="container">
      <div className="conv">
        <div className="conv-img">
          <Avatar size={50} src={user.imgUrl} />
        </div>

        <div className="conv-content">
          <div className="convLine">
            <span className="convLine-Name">{user.name}</span>
            <span className="convLine-date">
              {moment().startOf("hour").fromNow()}
            </span>
          </div>
          <div className="convLine">
            <span className="convLine-text">{user.text}</span>
            {true && <span className="convLine-count">{user.age}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
