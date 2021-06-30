import PropTypes from "prop-types";
import CheckRead from "../CheckRead";
import Time from "../Time";
import "./Conversation.scss";
import classNames from "classnames";

export default function Conversation({
  item,
  selection,
  date,
  isMe,
  isOnline,
  isRead,
  numbNotReadMessages,
  name,
  avatar,
  text,
  isReadMessage,
  selectedConvId
}) {
  return (
    <div
      className={classNames("container", {
        select: item._id === selection
      })}
      id={item._id}
      onClick={() => selectedConvId(item._id)}
    >
      <div className="conversation">
        <div
          className={classNames("conversation__avatar", {
            "conversation__avatar--online": isOnline
          })}
        >
          <img src={avatar} alt={`Avatar ${name}`} />
        </div>

        <div className="conversation__data">
          <div className="conversation__data-user">
            <p>{name}</p>
            <span>
              <Time date={date} />
            </span>
          </div>
          <div className="conversation__data-text">
            <p>{isMe ? `Вы: ${text}` : `${name}: ${text}`}</p>
            {(isMe && <CheckRead isRead={isRead} />) ||
              (isReadMessage && (
                <span className="conversation__data-text--count">
                  {numbNotReadMessages > 9 ? "9+" : numbNotReadMessages}
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Conversation.propTypes = {
  user: PropTypes.object,
  selection: PropTypes.string,
  date: PropTypes.string,
  isMe: PropTypes.bool,
  isOnline: PropTypes.bool,
  isRead: PropTypes.bool,
  numbNotReadMessages: PropTypes.number,
  name: PropTypes.string,
  avatar: PropTypes.string,
  text: PropTypes.string,
  isReadMessage: PropTypes.bool
};
