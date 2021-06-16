import { CheckOutlined, LoadingOutlined } from "@ant-design/icons";
import classNames from "classnames";
import "./CheckRead.scss";

const CheckRead = ({ isRead, loading }) => (
  loading ? <LoadingOutlined className="loading" /> : <CheckOutlined
    className={classNames("checkOutlined", {"checkOutlined--isRead": isRead})}
  />
);

export default CheckRead;