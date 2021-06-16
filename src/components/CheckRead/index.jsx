import {
  CheckOutlined,
  LoadingOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons";
import classNames from "classnames";
import "./CheckRead.scss";

const CheckRead = ({ isRead, loading, error }) =>
  error ? (
    <ExclamationCircleOutlined className="error" />
  ) : loading ? (
    <LoadingOutlined className="loading" />
  ) : (
    <CheckOutlined
      className={classNames("checkOutlined", {
        "checkOutlined--isRead": isRead
      })}
    />
  );

export default CheckRead;
