import { useState, useEffect } from "react";
import { Button } from "antd";
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
        <img src={user.imgUrl} />
        <p>{user.text}</p>
        <Button
          type="primary"
          onClick={() => {
            setFlag(!flag);
            setCount(count + 1);
          }}
        >
          Поменять цвет {+flag}
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
      <h1>Hello CodeSandbox</h1>
      <Header user={users} />
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
