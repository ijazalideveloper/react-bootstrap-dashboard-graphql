import React, { useState, useEffect, useRef } from "react";
import services from "services";
import { useToast } from "components/Toast";
import * as UpChunk from '@mux/upchunk'
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function FileUpload(props) {
  const toast = useToast();
  const { error,setFieldValue, type, name } = props;
 
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(props.muxAssetId && props.muxUploadId ? true : false);
  const [isFileLoading, setFileLoading] = useState(false);
  const [uploadId,setUploadId] = useState();
  const [assetId,setAssetId] = useState();
  const videoUpload = useRef();
  const [successUpload, setSuccessUpload] = useState()
  let [title, setTille] = useState(props.videoName)

  const changeHandler = (event) => {
    console.log('videoname inside mux uploadng component',title)
    setFileLoading(true);
    let file = event.target.files[0];
    setSelectedFile(file.name);
    setIsSelected(true);
    services.ClassService.addClassVideoMux({title: title})
    .then((data)=>{
        console.log(data);
        setUploadId(data.response.id);
        console.log(uploadId)
        videoUpload.current = UpChunk.createUpload({
            endpoint: data.response.url,
            file: file,
            chunkSize: 5120, // Uploads the file in ~5mb chunks
        });
        videoUpload.current.on('success', res=>{
            setSuccessUpload(true)
            console.log(data.response.id)
            console.log(res)
            services.ClassService.getMuxAssetFromId(data.response.id)
            .then((info)=>{
                console.log("video info", info)
                info.response.asset_id ? props.assetIdSetter(info.response.asset_id) : null.b;
                setAssetId(info.response.asset_id)
                info.response.id ? props.uploadIdSetter(info.response.id) : null.b;
                setFileLoading(false);
                toast.add("tr", "primary", type + " uploaded Successfully");
                console.log("assetId",assetId)
                services.ClassService.getPlaybackIDLink(data.response.id)
                .then(()=>{})
                .catch(()=>{})
            })
            .catch((err)=>{
                console.log("video info error", error)
            })
        })
        videoUpload.current.on('error', error =>{
            console.log("video error", error)
        })
        
    }).catch(()=>{
        console.log("error in upchunk");
    })
    console.log(file);
}

const removeFile = ()=>{
  setFileLoading(true);
  console.log(assetId)
  if(isSelected){
    services.ClassService.removeClassVideoMux(assetId || props.muxAssetId)
    .then((res)=>{
      setFieldValue(name, "");
      setIsSelected(false);
      setFileLoading(false);
      toast.add("tr", "primary", type + " Removed Successfully");
    })
    .catch((err)=>{
      setFileLoading(false);
        toast.add(
          "tr",
          "danger",

          err?.response?.data?.code?.code
            ? err.response.data.message.code
            : "Something went wrong"
        );
    });
  }
}

useEffect(()=>{},[])

  return (
    <div className="col-sm-6 form-group">
      <label>Upload to MUX {type}</label>
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
      {successUpload ? 
      <>
      <div className="col-auto">
          {/* <div className="col-sm-6 form-group">
                    <label htmlFor="">Name</label>
                    <Field name="name" className="form-control" type="text" />
                    <ErrorMessage
                      name="name"
                      component="small"
                      className="text-danger"
                    />
          </div>
          <button
            className="btn btn-success mr-2  btn-fill"
            type="submit"
            disabled={successUpload !== true}
          >
            Save
          </button> */}
        </div>

      </> : undefined
      }
    </div>
  );
}
