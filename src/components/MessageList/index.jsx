import  Message from "../Message";
import "./MessageList.scss";

export default function MessageList({ user }) {
  
  const data = user.map(user => <Message user={user} />);

  return (
    <section className="messageList">
      <div className="messageList__header">
        <div className="messageList__header-user">
          <img src={user[0].avatar} alt={`Avatar ${user[0].name}`}/>
          <p>{user[0].name}</p>
        </div>
      </div>
      <div className="messageList__content">
        {data}
      </div>
      <div className="messageList__input">
        <input type="text" placeholder="Введите сообщение..."></input>
      </div>
      
    </section>
  );
}