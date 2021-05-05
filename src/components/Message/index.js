import { Avatar } from "antd";
import "antd/dist/antd.css";
import "./styles.scss"; 

export default function Message({user}) {
  return (
    <div className="message_container">
      <div className="col-avatar">
        <div className="avatar">
          <Avatar size={50} src={user.avatar} />
        </div>
      </div>

      <div className="col-content">
        <div className="content">
          <div className="content_user">
            <span className="content_user__name">{user.name}</span>
            <span className="content_user__date">{user.date}</span>  
          </div>
          <div className="content_block">
            <span className="content_block__text">{user.text}</span>
          </div>
        </div>
      </div>
    </div>
  );
}