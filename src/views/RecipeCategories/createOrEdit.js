import React, { useState, useEffect } from "react";
import { Card, Row } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useToast } from "components/Toast";
import FileUpload from "components/FileUpload/UploadFile";
import services from "services";
import Loader from "components/Loader";
import moment from "moment";
const AddOrEditRecipeCat = (props) => {
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [disable, setDisable] = useState(false);
  const [isEditing, setIsEditing] = useState(null);

  const [initialValues, setInitialValues] = useState({
    name: "",
    icon: "",
    backgroundImage: "",
  });

  const handleValidations = (values) => {
    const errors = {};
    if (!values.name && !values.deletedAt) {
      errors.name = "* This field is required";
    }

    return errors;
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    if (!values.icon && !values.deletedAt) {
      toast.add("tr", "danger", "Image is required");
      return;
    }
    if (!values.backgroundImage) {
      toast.add("tr", "danger", "Background Image is required");
      return;
    }
    let obj = values;

    isEditing ? (obj["id"] = values.id) : null;
    isEditing
      ? services.RecipeService.updateCategory(obj).then((response) => {
          if (values.deletedAt) {
            toast.add("tr", "primary", "Category Deleted");
          } else {
            toast.add("tr", "primary", "Category Updated");
          }
          goBack();
        })
      : services.RecipeService.addCategory(obj)
          .then((response) => {
            toast.add("tr", "primary", "Category Created");
            goBack();
          })

          .catch((error) => {
            console.log(error);
            goBack();
            toast.add("tr", "danger", "Something Bad Happened");
          });

    setSubmitting(false);
    setDisable(true);
  };

  const getData = async () => {
    try {
      let id = props?.match?.params?.id;
      if (id) {
        let data = await services.RecipeService.getCatById(id);

        data = data.response;
        if (!data) {
          throw Error("Category not Found");
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

  useEffect(() => {
    getData();
  }, []);

  const goBack = () => props.history.push("/admin/recipe-categories");
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
                    <h2>{isEditing ? "Edit" : "Create"} Category</h2>
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
                  disabled={disable}
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

                  <FileUpload
                    name="icon"
                    type="image"
                    setFieldValue={setFieldValue}
                    link={values.icon}
                  />
                </Row>
                <Row>
                  <FileUpload
                    name="backgroundImage"
                    type=" background image"
                    setFieldValue={setFieldValue}
                    link={values.backgroundImage}
                  />
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

export default AddOrEditRecipeCat;
