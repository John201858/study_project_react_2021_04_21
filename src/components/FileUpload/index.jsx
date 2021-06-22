import { useState, useRef } from "react";
import "./FileUpload.scss";

const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000;
const KILO_BYTES_PER_BYTE = 1000;

const convertNestedObjectToArray = (nestedObj) =>
  Object.keys(nestedObj).map((key) => nestedObj[key]);

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

const FileUpload = ({
  label,
  updateFilesCb,
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
      <section className="fileUploadContainer">
        <label className="inputLabel">{label}</label>
        {/* <p className="dragDropText">Drag and drop your files anywhere or</p> */}
        {/* <button onClick={handleUploadBtnClick} className="uploadFileBtn" type="button"> */}
        <i onClick={handleUploadBtnClick} className="fas fa-file-upload" />
        {/* <span> Загрузить {otherProps.multiple ? "Файлы" : "Файл"}</span> */}
        {/* </button> */}
        <input
          className="formField"
          type="file"
          ref={fileInputField}
          title=""
          value=""
          onChange={handleNewFileUpload}
          {...otherProps}
        />
      </section>

      <article className="filePreviewContainer">
        {/* <span>Загружать</span> */}
        <section className="previewList">
          {Object.keys(files).map((fileName, index) => {
            let file = files[fileName];
            let isImageFile = file.type.split("/")[0] === "image";
            return (
              <section className="previewContainer" key={fileName}>
                <div>
                  {isImageFile && (
                    <img
                      className="imagePreview"
                      src={URL.createObjectURL(file)}
                      alt={`file preview ${index}`}
                    />
                  )}
                  <div className="fileMetaData" isImageFile={isImageFile}>
                    <span>{file.name}</span>
                    <aside>
                      <span>{convertBytesToKB(file.size)} kb</span>
                      <i
                        onClick={() => removeFile(fileName)}
                        className="fas fa-trash-alt removeFileIcon"
                      />
                    </aside>
                  </div>
                </div>
              </section>
            );
          })}
        </section>
      </article>
    </>
  );
};

export default FileUpload;
