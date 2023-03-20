import React, { useState, useEffect } from "react";
import services from "services";
import { useToast } from "components/Toast";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function FileUpload(props) {
  const toast = useToast();

  const { link, error, setFieldValue, type, name } = props;
  let a = link && link.split("?")[0];
  let finalLink = a && a.split("/")[3];

  const [selectedFile, setSelectedFile] = useState(finalLink);
  const [isSelected, setIsSelected] = useState(link ? true : false);
  const [isFileLoading, setFileLoading] = useState(false);
  useEffect(() => {
    if (finalLink) {
      setFieldValue(name, "/" + finalLink);
    }
  }, []);

  const changeHandler = (event) => {
    setIsSelected(true);
    setFileLoading(true);
    let file = event.target.files[0];
    setSelectedFile(file.name);
    var formData = new FormData();
    formData.append("file", file);
    services.ClassService.addClassVideo(formData)
      .then((res) => {
        setFieldValue(name, res.response.fileName);
        toast.add("tr", "primary", res.response.message);
        setFileLoading(false);
      })
      .catch((err) => {
        setFieldValue(name, "");
        setSelectedFile("");
        setIsSelected(false);
        setFileLoading(false);
        toast.add(
          "tr",
          "danger",

          err?.response?.data?.code?.code
            ? err.response.data.message.code
            : "File failed to upload"
        );
      });
  };
  const removeFile = () => {
    setFileLoading(true);
    let filename = selectedFile;

    let obj = {
      filename: filename,
    };
    services.ClassService.removeClassVideo(obj)
      .then((res) => {
        setFieldValue(name, "");
        setIsSelected(false);
        setFileLoading(false);
        toast.add("tr", "primary", type + " Removed Successfully");
      })
      .catch((err) => {
        setFileLoading(false);
        toast.add(
          "tr",
          "danger",

          err?.response?.data?.code?.code
            ? err.response.data.message.code
            : "Something went wrong"
        );
      });
  };

  return (
    <div className="col-sm-6 form-group">
      <label>Upload {type}</label>
      <div className="file-upload-wrapper ">
        {!isSelected ? (
          <div className="upload">
            <p>
              Drag {type} here or <span className="upload__button">Browse</span>
            </p>

            <input
              name={name}
              onChange={changeHandler}
              type="file"
              id="file"
              accept={type + "/*"}
              aria-label="File browser example"
            />
          </div>
        ) : (
          <div className="uploaded uploaded--one">
            <div className="file">
              <div className="d-flex align-items-center">
                <i className={`far fa-file-${type}`}></i>
                <span className="ml-3 file-name">{selectedFile}</span>
              </div>
              {!isFileLoading && (
                <i className="fas fa-times" onClick={removeFile}></i>
              )}
              {isFileLoading && (
                <div className="progress">
                  <div
                    className="progress-bar bg-success progress-bar-striped progress-bar-animated"
                    style={{ width: "100%" }}
                  ></div>
                </div>
              )}
            </div>
          </div>
        )}
        {props.error && !link && !isFileLoading ? (
          <small className="text-small text-danger">{props.error}</small>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
