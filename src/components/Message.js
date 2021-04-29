import Users from "./Users";

export default function Message({ user }) {
  let users = user.map((user) => (
    <li className="container">
      <Users user={user} />
    </li>
  ));

  return <ul>{users}</ul>;
}
