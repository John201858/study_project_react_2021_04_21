import { useState, useRef } from "react";

import { CameraOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

import "./FileUpload.scss";

const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000;
const KILO_BYTES_PER_BYTE = 1000;

const convertNestedObjectToArray = (nestedObj) =>
  Object.keys(nestedObj).map((key) => nestedObj[key]);

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

const FileUpload = ({
  label,
  updateFilesCb,
  icon,
  maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
  ...otherProps
}) => {
  const [files, setFiles] = useState({});
  const fileInputField = useRef(null);

  const handleUploadBtnClick = () => {
    fileInputField.current.click();
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

      <section className="previewList">
        {Object.keys(files).map((fileName, index) => {
          let file = files[fileName];
          let isImageFile = file.type.split("/")[0] === "image";
          return (
            <div className="previewList__element" key={fileName}>
              {isImageFile && (
                <img
                  className="previewList__element-image"
                  src={URL.createObjectURL(file)}
                  alt={`file preview ${index}`}
                />
              )}
              <div
                className="previewList__element-fileMetaData"
                isImageFile={isImageFile}
              >
                <p>{file.name}</p>
                <span>{convertBytesToKB(file.size)} kb</span>
              </div>
              <div className="previewList__element-icon">
                {/* <i
                    onClick={() => removeFile(fileName)}
                    className="fas fa-trash-alt removeFileIcon"
                  /> */}
                <EyeOutlined className="previewList__element-icon_eyeOutLined" />
                <DeleteOutlined
                  className="previewList__element-icon_deleteOutlined"
                  onClick={() => removeFile(fileName)}
                />
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default FileUpload;
