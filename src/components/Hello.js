export default function Hello({ name, flag }) {
  return <h1 className={flag ? "man" : "woman"}>Здравствуйте {name}!</h1>;
}
