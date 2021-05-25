import classNames from "classnames";
import "./Message.scss";
import CheckRead from "../CheckRead";
import Time from "../Time";
import PropTypes from "prop-types";

export default function Message({
  user,
  avatar,
  name,
  isMe,
  text,
  date,
  isRead,
  attachmens,
  isOnline
}) {
  return (
    <div className={classNames("message__block", { me: isMe })}>
      <div className={classNames("message", { "message--isMe": isMe })}>
        <div className="message__avatar">
          <span
            className={classNames({ "message__avatar--isOnline": isOnline })}
          />
          <img src={avatar} alt={`Avatar ${name}`} />
        </div>
        <div className="message__content">
          <div className="message__content-user">
            <p>{user.name}</p>
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
  user: PropTypes.string,
  avatar: PropTypes.string,
  name: PropTypes.string,
  isMe: PropTypes.bool,
  text: PropTypes.string,
  date: PropTypes.string,
  isRead: PropTypes.buul,
  attachmens: PropTypes.string,
  isOnline: PropTypes.bool
};
