import React, { useState, useEffect } from "react";
import { Card, Row } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useToast } from "components/Toast";
import FileUpload from "components/FileUpload/UploadFile";
import services from "services";
import Loader from "components/Loader";
import moment from "moment";

const AddOrEditBanner = (props) => {
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [disable, setDisable] = useState(false);
  const [isEditing, setIsEditing] = useState(null);

  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    imageUrl: "",
    url: "",
  });

  const handleValidations = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "* This field is required";
    }
    if (!values.description) {
      errors.description = "* This field is required";
    }

    return errors;
  };

  const BannerHandleSubmitAdd = async (values, goBack) => {
    let data = await services.BannerService.getAllBannersListWithoutPagination();
    data?.response?.data?.banners?.filter(e => e.name === values.name).length > 0 ? (alert('Banner already exists')) 
    : services.BannerService.addBanner(values)
      .then((response) => {
        toast.add("tr", "primary", "Banner Created");
        goBack();
      })
      .catch((error) => {
        goBack();
        toast.add("tr", "danger", "Something Bad Happened");
      });
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    let valuesUpdated = {
      name: values.name,
      description: values.description,
      imageUrl: values.imageUrl,
      url: values.url,
    }
    if (!values.imageUrl) {
      toast.add("tr", "danger", "Banner Image is required");
      return;
    }
    let obj = values;

    isEditing ? (obj["id"] = values.id) : null;
    isEditing
      ? services.BannerService.updateBanner(obj.id, valuesUpdated).then((response) => {
          if (values.deletedAt) {
            toast.add("tr", "primary", "Banner Deleted");
          } else {
            toast.add("tr", "primary", "Banner Updated");
          }
          setIsEditing(false);
          goBack();
        })
      : BannerHandleSubmitAdd(obj, goBack)
      // : services.BannerService.addBanner(obj)
      //     .then((response) => {
      //       toast.add("tr", "primary", "Banner Created");
      //       goBack();
      //     })

      //     .catch((error) => {
      //       console.log(error);
      //       goBack();
      //       toast.add("tr", "danger", "Something Bad Happened");
      //     });

    setSubmitting(false);
    setDisable(true);
  };

  const getData = async () => {
    try {
      let id = props?.match?.params?.id;
      if (id) {
        let data = await services.BannerService.getBannerById(id);

        data = data.response.data.banner;
        if (!data) {
          throw Error("Banner not Found");
        }
        setInitialValues(data);
      }
      setIsEditing(id);
    } catch (err) {
      console.log("err.response", err.response);

      toast.add(
        "tr",
        "danger",
        err.message || err?.response?.data?.code || "Something went wrong"
      );

      goBack();
    }
    setIsLoading(false);
  };

  const handleDelete = values => {
    services.BannerService.delBanner(values.id)
      .then(response => {
        toast.add("tr", "primary", "Banner Deleted");
        goBack();
      })
      .catch(error => {
        goBack();
        toast.add("tr", "danger", "Something Bad Happened");
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const goBack = () => props.history.push("/admin/banners");
  return !isLoading ? (
    <div>
      <Formik
        initialValues={initialValues}
        validate={handleValidations}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <Row>
              <div className="col">
                <div className="row">
                  <div className="col-sm-4">
                    <h2>{isEditing ? "Edit" : "Create"} Banner</h2>
                  </div>
                </div>
              </div>

              <div className="col-auto">
                <button
                  className="btn btn-light mr-2  "
                  type="button"
                  onClick={() => goBack()}
                >
                  Back
                </button>
                {isEditing && (
                  <button
                    className="btn btn-secondary mr-2  btn-fill "
                    type="submit"
                    disabled={disable}
                    onClick={() => {
                      confirm("Are You Sure to delete this ??") && handleDelete(values)
                      setFieldValue(
                        "deletedAt",
                        new Date(moment().format("YYYY-M-DD HH:mm:ss"))
                      );
                    }}
                  >
                    Delete
                  </button>
                )}
                <button
                  className="btn btn-success mr-2  btn-fill"
                  type="submit"
                  // disabled={disable}
                  // disabled={isSubmitting}
                >
                  Save
                </button>
              </div>
            </Row>

            <Card>
              <Card.Body>
                <Row>
                  <div className="col-sm-6 form-group">
                    <label htmlFor="">Name</label>
                    <Field name="name" className="form-control" type="text" />
                    <ErrorMessage
                      name="name"
                      component="small"
                      className="text-danger"
                    />
                  </div>
                  
                  <div className="col-sm-6 form-group">
                    <label htmlFor="">Description</label>
                    <Field name="description" className="form-control" type="text" />
                    <ErrorMessage
                      name="description"
                      component="small"
                      className="text-danger"
                    />
                  </div>
                  
                </Row>
                <Row>
                  <FileUpload
                    name="imageUrl"
                    type="image"
                    setFieldValue={setFieldValue}
                    link={isEditing ? values.imageUrl : ''}
                  />
                  <div className="col-sm-6 form-group">
                    <label htmlFor="">URL</label>
                    <Field name="url" className="form-control" type="text" />
                    <ErrorMessage
                      name="description"
                      component="small"
                      className="text-danger"
                    />
                  </div>
                </Row>
              </Card.Body>
            </Card>
          </Form>
        )}
      </Formik>
    </div>
  ) : (
    <Loader />
  );
};

export default AddOrEditBanner;
