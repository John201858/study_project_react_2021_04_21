import { useState, useRef } from "react";

import { CameraOutlined } from "@ant-design/icons";

import Attachmens from "./Attachmens";
import "./FileUpload.scss";

const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000;

const convertNestedObjectToArray = (nestedObj) =>
  Object.keys(nestedObj).map((key) => nestedObj[key]);

const FileUpload = ({
  label,
  updateFilesCb,
  icon,
  getContentBox,
  maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
  ...otherProps
}) => {
  const [files, setFiles] = useState({});

  const fileInputField = useRef(null);

  const handleUploadBtnClick = () => {
    fileInputField.current.click();
    return getContentBox(contentBox);
  };

  const addNewFiles = (newFiles) => {
    for (let file of newFiles) {
      if (file.size < maxFileSizeInBytes) {
        if (!otherProps.multiple) {
          return { file };
        }
        files[file.name] = file;
      }
    }
    return { ...files };
  };

  const callUpdateFilesCb = (files) => {
    const filesAsArray = convertNestedObjectToArray(files);
    updateFilesCb(filesAsArray);
  };

  const handleNewFileUpload = (e) => {
    const { files: newFiles } = e.target;
    if (newFiles.length) {
      let updatedFiles = addNewFiles(newFiles);
      setFiles(updatedFiles);
      callUpdateFilesCb(updatedFiles);
    }
  };

  const removeFile = (fileName) => {
    delete files[fileName];
    setFiles({ ...files });
    callUpdateFilesCb({ ...files });
  };

  const contentBox = (
    <section className="previewList">
      {Object.keys(files).map((fileName, index) => {
        let file = files[fileName];
        let isImageFile = file.type.split("/")[0] === "image";
        return (
          <Attachmens
            file={file}
            fileName={fileName}
            isImageFile={isImageFile}
            removeFile={removeFile}
            index={index}
          />
        );
      })}
    </section>
  );

  return (
    <>
      <CameraOutlined onClick={handleUploadBtnClick} className="icon" />
      <input
        className="formField"
        type="file"
        ref={fileInputField}
        title=""
        value=""
        onChange={handleNewFileUpload}
        {...otherProps}
      />
    </>
  );
};

export default FileUpload;
