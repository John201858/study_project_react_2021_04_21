import { useState, useEffect } from "react";
import "./styles.css";

function Header({ name }) {
  const [flag, setFlag] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Обновляем заголовок документа, используя API браузера
    document.title = `Вы нажали ${count} раз`;
  });

  return (
    <div className="container">
      <Hello name={name} flag={flag} />
      <button
        onClick={() => {
          setFlag(!flag);
          setCount(count + 1);
          console.log(`${count}`);
        }}
      >
        Поменять цвет {+flag}
      </button>
    </div>
  );
}

function Hello({ name, flag }) {
  return <h1 className={flag ? "man" : "woman"}>Здравствуйте {name}!</h1>;
}

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <Header name="Джон" />
      <Header name="Джесси" />
      <Header name="Джэк" />
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
