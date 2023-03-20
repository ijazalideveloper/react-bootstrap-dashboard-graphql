import React, { useState, useEffect } from "react";
import { Card, Row } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useToast } from "components/Toast";
import services from "services";
import Select from "react-select";
import Loader from "components/Loader";
import makeAnimated from "react-select/animated";
import MaskedInput from "react-text-mask";
import FileUpload from "components/FileUpload/UploadFile";
import Ingredients from "./Ingredients";
import RecipeSteps from "./RecipeSteps";
import moment from "moment";
const AddOrEditRecipe = (props) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(null);
  const [disable, setDisable] = useState(false);
  const animatedComponents = makeAnimated();
  const [recipeCategories, setRecipeCategories] = useState();
  const [selectedRecipeCat, setSelectedRecipeCat] = useState();
  const [initialValues, setInitialValues] = useState({
    name: "",
    difficultyLevel: "Easy",
    calories: "0",
    ingredients: [],
    duration: "",
    steps: [],
    icon: "",
    disabled: 0,
    categories: [],
  });

  const handleValidations = (values) => {
    const errors = {};
    if (!values.deletedAt) {
      if (!values.name) {
        errors.name = "* This field is required";
      }
      if (!values.calories) {
        errors.calories = "* This field is required";
      }
      if (!values.duration) {
        errors.duration = "* This field is required";
      }
    }

    return errors;
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    if (!values.deletedAt) {
      if (!values.icon) {
        toast.add("tr", "danger", "Icon is required");
        return;
      }
      if (!values.steps) {
        toast.add("tr", "danger", "add at least one step");
        return;
      }
      if (!values.ingredients) {
        toast.add("tr", "danger", "add at least one ingredient");
        return;
      }
      if (!values.categories) {
        toast.add("tr", "danger", "No category selected");
        return;
      }
    }
    let recipeObj = {
      name: values.name,
      difficultyLevel: values.difficultyLevel,
      calories: parseInt(values.calories),
      ingredients: JSON.stringify(values.ingredients),
      duration: values.duration,
      steps: JSON.stringify(values.steps),
      icon: values.icon,
      categories: values.categories,
    };
    if (values.deletedAt) {
      recipeObj.deletedAt = values.deletedAt;
    }
    isEditing ? (recipeObj["id"] = values.id) : null;
    isEditing
      ? services.RecipeService.updateRecipe(recipeObj).then((response) => {
          if (values.deletedAt) {
            toast.add("tr", "primary", "Recipe Deleted");
          } else {
            toast.add("tr", "primary", "Recipe Updated");
          }
          goBack();
        })
      : services.RecipeService.addRecipe(recipeObj)
          .then((response) => {
            goBack();
            toast.add("tr", "primary", "Recipe Created");
            goBack();
          })

          .catch((error) => {
            toast.add("tr", "danger", "Something Bad Happened");
            console.log(error);
            goBack();
          });

    setSubmitting(false);
    setDisable(true);
  };
  const getCat = async () => {
    services.RecipeService.getAllCategories()
      .then((res) => {
        let categories = res.response;

        let options = categories?.map((item) => {
          let option = {
            value: item.id,
            label: (
              <div>
                <img
                  src={item.icon}
                  height="30px"
                  width="30px"
                  style={{ padding: 3, marginRight: 3 }}
                />
                {item.name}
              </div>
            ),
          };
          return option;
        });

        setRecipeCategories(options);
      })
      .catch((error) => console.log(error));
  };
  const getData = async () => {
    try {
      let id = props?.match?.params?.id;
      if (id) {
        let data = await services.RecipeService.getRecipeById(id);

        data = data.response;
        let categories = data.categories?.map((item) => {
          let option = {
            value: item.id,
            label: (
              <div>
                <img
                  src={item.icon}
                  height="30px"
                  width="30px"
                  style={{ padding: 3, marginRight: 3 }}
                />
                {item.name}
              </div>
            ),
          };
          return option;
        });
        data["categories"] = categories;
        console.log(data);
        if (!data) {
          throw Error("Recipe not Found");
        }
        setInitialValues(data);
      } else {
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
    getCat();
    getData();
  }, []);

  const goBack = () => props.history.push("/admin/recipes");
  return !isLoading ? (
    <div>
      <Formik
        initialValues={initialValues}
        validate={handleValidations}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, errors, setFieldValue }) => (
          <Form>
            <Row>
              <div className="col">
                <div className="row">
                  <div className="col-sm-4">
                    <h2>{isEditing ? "Edit" : "Create"} Recipe</h2>
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
                  <div className="col-sm-6 form-group">
                    <label htmlFor="">Recipe Categories</label>
                    <Select
                      name="categories"
                      defaultValue={values.categories}
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      isMulti
                      placeholder="Select Recipe Categories"
                      onChange={(selectedOption) => {
                        let categories = selectedOption.map((cat) => {
                          return cat.value;
                        });

                        setFieldValue("categories", categories);
                        setSelectedRecipeCat(selectedOption);
                      }}
                      options={recipeCategories}
                    />
                  </div>
                </Row>
                <Row>
                  <div className="col-sm-6 form-group">
                    <label htmlFor="">Dificulty Level</label>
                    <div
                      className="checkbox-group form-control"
                      role="group"
                      aria-labelledby="checkbox-group"
                    >
                      <div className="radio-btn">
                        <Field
                          type="radio"
                          name="difficultyLevel"
                          value="Easy"
                        />
                        <label className="form-check-inline">Easy</label>
                      </div>
                      <div className="radio-btn">
                        <Field
                          type="radio"
                          name="difficultyLevel"
                          value="Normal"
                        />
                        <label className="form-check-inline">Normal</label>
                      </div>
                      <div className="radio-btn">
                        <Field
                          type="radio"
                          name="difficultyLevel"
                          value="Hard"
                        />
                        <label className="form-check-inline">Hard</label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 form-group">
                    <label htmlFor="">Calories</label>
                    <Field
                      name="calories"
                      className="form-control"
                      type="text"
                    />
                    <ErrorMessage
                      name="calories"
                      component="small"
                      className="text-danger"
                    />
                  </div>
                </Row>
                <Row>
                  <div className="col-sm-6 form-group">
                    <label>Add Recipe Duration</label>

                    <MaskedInput
                      name="duration"
                      id="duration"
                      value={values.duration}
                      className="form-control"
                      mask={[/[0-9]/, /[0-9]/, ":", /[0-9]/, /[0-9]/]}
                      placeholder="minute : second"
                      onChange={(e) =>
                        setFieldValue("duration", e.target.value)
                      }
                    />
                    <ErrorMessage
                      name="duration"
                      component="small"
                      className="text-danger"
                    />
                  </div>
                  <FileUpload
                    name="icon"
                    setFieldValue={setFieldValue}
                    type="image"
                    link={values.icon}
                    error={errors.icon}
                  />
                </Row>
                <Row>
                  <div className="col-sm-6 form-group">
                    <label htmlFor="">Recipe Ingredients</label>
                    <Ingredients
                      ingredients={values.ingredients}
                      setFieldValue={setFieldValue}
                    />
                  </div>
                  <div className="col-sm-6 form-group">
                    <label htmlFor="">Recipe Steps</label>
                    <RecipeSteps
                      steps={values.steps}
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
  ) : (
    <Loader />
  );
};

export default AddOrEditRecipe;
