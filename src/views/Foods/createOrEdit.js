import React, { useState, useEffect } from "react";
import { Card, Row } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useToast } from "components/Toast";
import services from "services";
import Loader from "components/Loader";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import FoodCats from "./FoodCats";
const AddOrEditFood = props => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(null);
  const [initialValues, setInitialValues] = useState({});
  const [categoriesArr, setCategoriesArr] = useState([]);
  const animatedComponents = makeAnimated();
  const handleValidations = values => {
    const errors = {};
    if (!values.deletedAt) {
      if (!values.name) {
        errors.name = "* This field is required";
      }
      if (!values.portionSize) {
        errors.name = "* This field is required";
      }
      if (!values.description) {
        errors.description = "* This field is required";
      }
    }
    return errors;
  };

  const validateFields = (values) => {
    return (
      values &&
      values.name &&
      values.portionSize &&
      ((!isEditing && values.categoryId) ||
        (isEditing && (values.foodCategories.length > 0 || values.categoryId)))
    );
    // (values.foodCategories.length < 1 && !values.categoryId)
  };

  const handleSubmit = values => {
    let foodObj = {
      id: values.id,
      name: values.name,
      portionSize: values.portionSize,
      weight: values.weight,
      categoryId: values.categoryId,
    };
    validateFields(values)
      ? isEditing
        ? services.FoodService.updateFood(foodObj).then(response => {
            if (values.deletedAt) {
              toast.add("tr", "primary", "Food Deleted");
            } else {
              toast.add("tr", "primary", "Food Updated");
            }
            goBack();
          }).catch(error => {
            goBack();
            toast.add("tr", "danger", "Something Bad Happened");
          })
        : services.FoodService.addFood(foodObj)
            .then(response => {
              toast.add("tr", "primary", "Food Created");
              goBack();
            })
            .catch(error => {
              goBack();
              toast.add("tr", "danger", "Something Bad Happened");
            })
      : toast.add("tr", "danger", "Required Fields Are Missing");
  };

  const handleDelete = values => {
    services.FoodService.delFood({ id: values.id })
      .then(response => {
        toast.add("tr", "primary", "Food Deleted");
        goBack();
      })
      .catch(error => {
        goBack();
        toast.add("tr", "danger", "Something Bad Happened");
      });
  };


  const getFoodCats = async () => {
    try {
      let data = await services.FoodCategoriesService.getFoodCategories();
      let categoryArr = [];
      data?.response?.data?.forEach((element) => {
        categoryArr = [
          ...categoryArr,
          { value: element.id, label: element.title },
        ];
      });
      setCategoriesArr(categoryArr);
    } catch (err) {
      toast.add(
        "tr",
        "danger",
        err.message || err?.response?.data?.code || "Something went wrong"
      );
    }
  };

  useEffect(() => {
    getData();
    getFoodCats();
  }, []);

  const getData = async () => {
    try {
      let id = props?.match?.params?.id;
      if (id) {
        let data = await services.FoodService.getFoodById(id);
        data = data.response;
        if (!data) {
          throw Error("Food not Found");
        }
        setInitialValues(data);
      }
      setIsEditing(id);
    } catch (err) {
      goBack();
    }
    setIsLoading(false);
  };
  const goBack = () => props.history.push("/admin/foods");
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
                    <h2>{isEditing ? "Edit" : "Create"} Food</h2>
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
                    onClick={() => {
                      confirm("Are You Sure to delete this ??") && handleDelete(values)
                    }}
                  >
                    Delete
                  </button>
                )}
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
                    <label htmlFor="">* Name</label>
                    <Field name="name" className="form-control" type="text" />
                    <ErrorMessage
                      name="name"
                      component="small"
                      className="text-danger"
                    />
                  </div>

                  <div className="col-sm-6 form-group">
                    <label htmlFor="">* Portion Size</label>
                    <Field
                      name="portionSize"
                      className="form-control"
                      type="text"
                    />
                  </div>

                  <div className="col-sm-6 form-group">
                    <label htmlFor=""> Weight in grams</label>
                    <Field
                      name="weight"
                      className="form-control"
                      type="number"
                    />
                  </div>

                  <div className="col form-group">
                    <label htmlFor="">* Category</label>
                    <Select
                      name="categoryId"
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      placeholder={
                        isEditing
                          ? initialValues.foodCategories[0]
                            ? initialValues.foodCategories[
                                initialValues.foodCategories.length - 1
                              ].title
                            : "category"
                          : "category"
                      }
                      onChange={selectedOption => {
                        values.categoryId = selectedOption.value;
                      }}
                      options={categoriesArr}
                    />
                  </div>
                  <div className="col-sm-6 form-group">
                    <label htmlFor="">Food Categories</label>
                    <FoodCats
                      foodId={values.id}
                      cats={values.foodCategories}
                      setFieldValue={setFieldValue}
                    />
                  </div>
                </Row>
              </Card.Body>
            </Card>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddOrEditFood;
