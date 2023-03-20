import React, { useState, useEffect } from "react";
import { Card, Row } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useToast } from "components/Toast";
import FileUpload from "components/FileUpload/UploadFile";
import services from "services";
import Loader from "components/Loader";
const AddOrEditFoodCat = props => {
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [disable, setDisable] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const handleValidations = values => {
    const errors = {};
    if (!values.name && !values.deletedAt) {
      errors.name = "* This field is required";
    }
    return errors;
  };

  const handleSubmit = values => {
    let foodCatObj = {
      id: values.id,
      title: values.title,
      description: values.description,
      image: values.image,
    };
    isEditing
      ? services.FoodCategoriesService.updateFoodCategory(foodCatObj).then(
          response => {
            if (values.deletedAt) {
              toast.add("tr", "primary", "Food Category Deleted");
            } else {
              toast.add("tr", "primary", "Food Category Updated");
            }
            setIsEditing(false);
            goBack();
          }
        )
      : services.FoodCategoriesService.addFoodCategory(foodCatObj)
          .then(response => {
            toast.add("tr", "primary", "Food Category Created");
            goBack();
          })
          .catch(error => {
            goBack();
            toast.add("tr", "danger", "Something Bad Happened");
          });
  };

  const handleDelete = values => {
    services.FoodCategoriesService.deleteFoodCategory({
      id: values.id,
      delete: true,
    })
      .then(response => {
        toast.add("tr", "primary", " Food Category Deleted");
        goBack();
      })
      .catch(error => {
        goBack();
        toast.add("tr", "danger", "Something Bad Happened");
      });
  };

  const getData = async () => {
    try {
      let id = props?.match?.params?.id;
      if (id) {
        let data = await services.FoodCategoriesService.getFoodCategoryById(id);

        data = data.response;
        if (!data) {
          throw Error("Category not Found");
        }
        setInitialValues(data);
        if (data) setIsEditing(true);
      }
      // setIsEditing(id);
    } catch (err) {
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
  const goBack = () => props.history.push("/admin/food-cat");
  if (isLoading) {
    return <Loader />;
  }

  return (
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
                    <h2>{isEditing ? "Edit" : "Create"} Food Category</h2>
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
                {/* {isEditing && (
                  <button
                    className="btn btn-secondary mr-2  btn-fill "
                    type="submit"
                    disabled={disable}
                    onClick={() => {
                        confirm("Are You Sure to delete this ??") && handleDelete(values)
                      // setFieldValue(
                      //   "deletedAt",
                      //   new Date(moment().format("YYYY-M-DD HH:mm:ss"))
                      // );
                    }}
                  >
                    Delete
                  </button>
                )} */}
                <button
                  className="btn btn-success mr-2  btn-fill"
                  type="submit"
                  onClick={() => {
                    handleSubmit(values);
                  }}
                >
                  Save
                </button>
              </div>
            </Row>

            <Card>
              <Card.Body>
                <Row>
                  <div className="col-sm-6 form-group">
                    <label htmlFor="">Title</label>
                    <Field name="title" className="form-control" type="text" />
                    <ErrorMessage
                      name="title"
                      component="small"
                      className="text-danger"
                    />
                  </div>

                  <div className="col-sm-6 form-group">
                    <label htmlFor=""> Description</label>
                    <Field
                      name="description"
                      className="form-control"
                      type="text"
                    />
                  </div>

                  <FileUpload
                    name="image"
                    type="image"
                    setFieldValue={setFieldValue}
                    link={isEditing ? values.image : ''}
                    // link={isEditing ? values.image : "./" + values.image}
                  />
                </Row>
              </Card.Body>
            </Card>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddOrEditFoodCat;
