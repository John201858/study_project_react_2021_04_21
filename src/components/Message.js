import Users from "./Users";

export default function Message({ user }) {
  let users = user.map((user) => (
    <li key={user._id} className="container">
      <Users user={user} />
    </li>
  ));

  return <ul className="container">{users}</ul>;
}
