import { useState } from "react";

import { Modal } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";

import "./Attachmens.scss";

const KILO_BYTES_PER_BYTE = 1000;
const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

const Attachmens = ({ file, fileName, removeFile, isImageFile, index }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  return (
    <div className="attachmens" key={fileName}>
      {isImageFile && (
        <img
          className="attachmens__image"
          src={URL.createObjectURL(file)}
          alt={`file preview ${index}`}
        />
      )}
      <div className="attachmens__fileMetaData" isImageFile={isImageFile}>
        <p>{file.name}</p>
        <span>{convertBytesToKB(file.size)} kb</span>
      </div>
      <Modal
        visible={previewVisible}
        title={file.name}
        onCancel={() => setPreviewVisible(false)}
        footer={null}
        centered
      >
        <img
          alt="example"
          style={{ width: "100%" }}
          src={URL.createObjectURL(file)}
        />
      </Modal>
      <div className="attachmens__icon">
        <EyeOutlined
          onClick={() => setPreviewVisible(true)}
          className="attachmens__icon-eyeOutLined"
        />
        <DeleteOutlined
          className="attachmens__icon-deleteOutlined"
          onClick={() => removeFile(fileName)}
        />
      </div>
    </div>
  );
};

export default Attachmens;
