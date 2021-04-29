import { useState, useEffect } from "react";
import { Button, Avatar } from "antd";
import Hello from "../Hello.js";
import "antd/dist/antd.css";
import "./styles.css";

export default function Users({ user }) {
  const [flag, setFlag] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Обновляем заголовок документа, используя API браузера
    document.title = `${user.name} нажал(а) ${count} раз`;
  });

  return (
    <>
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
    </>
  );
}
