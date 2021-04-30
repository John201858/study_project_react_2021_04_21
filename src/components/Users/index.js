import { useState, useEffect } from "react";
import { Button, Avatar, Row, Col } from "antd";
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
      <h1 className={flag ? "man" : "woman"}>Здравствуйте {user.name}!</h1>
      {flag || (
        <Row>
          <Col className="avatar" xs={24} sm={24} md={6} lg={6} xl={6}>
            <Avatar size={130} src={user.imgUrl} />
            <p className="avatar_name">{user.name}</p>
          </Col>
          <Col xs={24} sm={24} md={18} lg={18} xl={18}>
            <p className="user_text">{user.text}</p>
          </Col>
        </Row>
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
