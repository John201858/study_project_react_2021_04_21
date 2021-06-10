import { useState } from "react";
import classNames from "classnames";
import "./Message.scss";
import CheckRead from "../CheckRead";
import Time from "../Time";
import PropTypes from "prop-types";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";

export default function Message({
  id,
  avatar,
  name,
  isMe,
  text,
  date,
  isRead,
  attachmens,
  isOnline,
  refDeleteMessage
}) {
  const [stateMenu, setStateMenu] = useState(false);

  return (
    <div className={classNames("message__block", { me: isMe })}>
      <div className={classNames("message", { "message--isMe": isMe })}>
        <div className="message__col">
          <div className="message__col-avatar">
            <span
              className={classNames({
                "message__col-avatar--isOnline": isOnline
              })}
            />
            <img src={avatar} alt={`Avatar ${name}`} />
          </div>
          <div className="message__col-icons">
            <MoreOutlined
              onClick={() => setStateMenu(!stateMenu)}
              rotate="90"
              className="message__col-icons_icon"
            />
            {stateMenu && (
              <>
                <EditOutlined className="message__col-icons_icon" />
                <DeleteOutlined
                  onClick={() => refDeleteMessage(id)}
                  className="message__col-icons_icon"
                />
              </>
            )}
          </div>
        </div>
        <div className="message__content">
          <div className="message__content-user">
            <p>{name}</p>
            <span>
              {isMe && <CheckRead isRead={isRead} />}
              <Time date={date} />
            </span>
          </div>

          {text && (
            <div className="message__content-text">
              <p>{text}</p>
            </div>
          )}

          {attachmens && (
            <div className="message__content-attachmens">
              {attachmens.map((attach) => (
                <img src={attach} alt="Вложение: картинка" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Message.propTypes = {
  user: PropTypes.object,
  avatar: PropTypes.string,
  name: PropTypes.string,
  isMe: PropTypes.bool,
  text: PropTypes.string,
  date: PropTypes.string,
  isRead: PropTypes.bool,
  attachmens: PropTypes.array,
  isOnline: PropTypes.bool
};
