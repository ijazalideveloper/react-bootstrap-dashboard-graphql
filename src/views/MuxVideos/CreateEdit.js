import React, { useState, useEffect } from "react";
import moment from "moment";
import { Card, Row } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useToast } from "components/Toast";
import services from "services";
import FileUploadMux from "components/FileUpload/UploadFileMux"
import Loader from "components/Loader";
import makeAnimated from "react-select/animated";

const MuxVideoCreateOrUpdate = (props) => {

  const toast = useToast();
  const [disable, setDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [muxAssetId,setMuxAssetId] = useState();
  const [muxUploadId,setMuxUploadId] = useState();
  const [muxVideoLink, setMuxVideoLink] = useState()

  const [initialValues, setInitialValues] = useState({
    name: "",
  });

  const [videoName, setVideoName] = useState("")
  let [isTitleSet, setIsTitleSet] = useState(false)
  // const createVideoUploadURL = asy

  const handleSubmit = async (values, { setSubmitting }) => {
    let video = {
      name: values.name,
    };
    if (isEditing) {
      classObj.id = values.id;
    }
       services.MuxService.addVideo(video)
          .then((response) => {
            toast.add("tr", "primary", "Class Created");
            seetDisable(false);
          })
          .catch((error) => {
            console.log(error);
            goBack();
            toast.add("tr", "danger", "Something Bad Happened");
          });
    setDisable(true);
  };

  const goBack = () => props.history.push("/admin/muxvideos");

  if (isLoading) {
    return <Loader />;
  }

    const handleValidations = (values) => {
    const errors = {};
    if (!values.deletedAt) {
      if (!values.name) {
        errors.name = "* This field is required";
      }
    }

    return errors;
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validate={handleValidations}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            {/* <Row>
              <div className="col">
                <div className="row">
                  <div className="col-sm-4">
                    <h2>New Video (Mux)</h2>
                  </div>
                </div>
              </div>
              <div className="col-auto">
                <button
                  className="btn btn-success mr-2  btn-fill"
                  type="submit"
                  disabled={disable}
                >
                  Save
                </button>
              </div>
            </Row> */}

            <Card>
              <Card.Body>
                <Row>
                  <div className="col-sm-6 form-group">
                    <label htmlFor="">Title</label>
                    <input 
                      value = {videoName}
                      onChange = {(e) => {
                        console.log('e.target.value',e.target.value)
                        setVideoName(e.target.value)
                      }}

                    >
                    </input>
                  </div>
                  <button
                    className="btn btn-success mr-2  btn-fill"
                    onClick={e => {
                      console.log('save title,', videoName)
                      setIsTitleSet(true)
                    }}
                    // disabled={disable}
                  >
                  Save
                  </button>

                </Row>
                { isTitleSet ? 
                (() => {
                let vidname = videoName;
                console.log("vidname",vidname)
                return <Row>
                    <>
                      <FileUploadMux
                        type="video"
                        name="linkMux"
                        videoName={vidname}
                        setFieldValue={setFieldValue}
                        classId = {values.id}
                        assetId={muxAssetId}
                        uploadId={muxUploadId}
                        assetIdSetter={setMuxAssetId}
                        uploadIdSetter={setMuxUploadId}
                        linkSetter={setMuxVideoLink}
                      />
                    </>
                  
                </Row> })(): undefined
                }
              </Card.Body>
            </Card>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MuxVideoCreateOrUpdate;