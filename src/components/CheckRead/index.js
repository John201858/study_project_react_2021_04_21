import { CheckOutlined } from "@ant-design/icons";
import classNames from "classnames";
import "./CheckRead.scss";

const CheckRead = ({ isRead }) => (
  <CheckOutlined
    className={classNames("checkOutlined", {"checkOutlined--isRead": isRead})}
  />
);

export default CheckRead;