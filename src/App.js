import { useState, useEffect } from "react";
import { Button, Avatar } from "antd";
import "antd/dist/antd.css";
import "./styles.css";
import users from "../users.json";

function Header({ user }) {
  // const [flag, setFlag] = useState(false);
  // const [count, setCount] = useState(0);

  let users = user.map((user) => {
    const [flag, setFlag] = useState(false);
    const [count, setCount] = useState(0);

    useEffect(() => {
      // Обновляем заголовок документа, используя API браузера
      document.title = `Вы нажали ${count} раз`;
    });

    return (
      <div className="container">
        <Hello name={user.name} flag={flag} />
        {flag || (
          <div class="content">
            <div class="user_avatar">
              <Avatar size={130} src={user.imgUrl} />
              <p>{user.name}</p>
            </div>
            <p class="user_text">{user.text}</p>
          </div>
        )}
        <Button
          type="primary"
          onClick={() => {
            setFlag(!flag);
            setCount(count + 1);
          }}
        >
          {flag ? "Открыть сообщение" : "Закрыть сообщение"}
        </Button>
      </div>
    );
  });

  return users;
}

function Hello({ name, flag }) {
  return <h1 className={flag ? "man" : "woman"}>Здравствуйте {name}!</h1>;
}

export default function App() {
  return (
    <div className="App">
      <h1>Лента новостей</h1>
      <Header user={users} />
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
