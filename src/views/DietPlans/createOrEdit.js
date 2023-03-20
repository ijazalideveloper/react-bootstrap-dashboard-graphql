import React, { useState, useEffect } from "react";
import { Card, Table, Container, Row, Col } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useToast } from "components/Toast";
import services from "services";
import moment from "moment";
import Loader from "components/Loader";
import Select from "react-select";
import AsyncSelect from 'react-select/async';

import makeAnimated from "react-select/animated";
import FileUpload from "components/FileUpload/UploadFile";
import DateRangePicker from "react-bootstrap-daterangepicker";
import ShiftDetails from "./ShiftDetails";
const AddOrEditDietPlan = (props) => {
  const animatedComponents = makeAnimated();

  const toast = useToast();
  const [days, setDays] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [members, setMemebers] = useState();
  const [isEditing, setIsEditing] = useState(null);
  const [memberOptions, setMemberOptions] = useState();
  const [initialValues, setInitialValues] = useState({
    name: "",
    icon: "",
    activeFrom: "",
    activeTill: "",
    disabled: 0,
    shifts: [],
    members: [],
  });

  const handleValidations = (values) => {
    const errors = {};
    if (!values.name && !values.deletedAt) {
      errors.name = "* This field is required";
    }

    return errors;
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    if (!values.deletedAt) {
      if (!values.activeFrom) {
        toast.add("tr", "danger", "Add Diet Plan Validity First");
        return;
      }
      if (!values.icon) {
        toast.add("tr", "danger", "Icon is required");
        return;
      }

      let notValidShifts = true;
      days.map((day) => {
        day.shifts.map((shift) => {
          if (!shift.recipes) {
            notValidShifts = false;
          } else {
            shift.recipes.map((recipe) => {
              return recipe.value;
            });
            return shift;
          }
        });
      });

      if (!notValidShifts) {
        toast.add(
          "tr",
          "danger",
          "Please assign recipe to each shift in a day first"
        );
        return;
      }
    }
    let planObj = {
      name: values.name,
      days: days,
      icon: values.icon,
      activeFrom: values.activeFrom,
      activeTill: values.activeTill,
      disabled: values.disabled,

      members: members
        ? values.members.map((member) => {
          return member.value;
        })
        : null,
    };
    if (values.deletedAt) {
      planObj.deletedAt = values.deletedAt;
    }
    isEditing ? (planObj["id"] = values.id) : null;
    isEditing
      ? services.DietPlanService.updateDietPlan(planObj).then((response) => {
        if (values.deletedAt) {
          toast.add("tr", "primary", "Plan Deleted");
        } else {
          toast.add("tr", "primary", "Plan Updated");
        }
        goBack();
      })
      : services.DietPlanService.addDietPlan(planObj)
        .then((response) => {
          toast.add("tr", "primary", "Plan Created");
          goBack();
        })

        .catch((error) => {
          console.log(error);
          goBack();
          toast.add("tr", "danger", "Something Bad Happened");
        });

    setSubmitting(false);
  };

  const getData = async () => {
    try {
      let id = props?.match?.params?.id;
      if (id) {
        let data = await services.DietPlanService.getPlanById(id);

        data = data.response;
        if (!data) {
          throw Error("Plan not Found");
        }
        data["members"] = data.members.map((member) => {
          let option = {
            value: member.id,
            label: member.fullName,
          };
          return option;
        });

        if (data.days) {
          setDays(data.days);
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

  const getOptions = async (search, callback) =>{

    let data = await services.MemberService.getAllMembers(search,1,10);
    let members = data.response.data;
    let options = members?.map((member) => {
      let option = {
        value: member.id,
        label: member.fullName,
      };
      return option;
    });
    return callback(options);
  }

  const getAllMembers = async () => {
    try {
      
      getOptions("",setMemberOptions);

    } catch (err) {
      console.log("err.response", err.response);

      toast.add(
        "tr",
        "danger",
        err.message || err?.response?.data?.code || "Something went wrong"
      );
    }
  };
  const getAllRecipes = async () => {
    try {
      let data = await services.RecipeService.getAllRecipes();
      let recipes = data.response;
      let options = recipes?.map((recipe) => {
        let option = {
          value: recipe.id,
          label: recipe.name,
        };
        return option;
      });
      setRecipes(options);
    } catch (err) {
      console.log("err.response", err.response);

      toast.add(
        "tr",
        "danger",
        err.message || err?.response?.data?.code || "Something went wrong"
      );
    }
  };
  const getDays = async () => {
    try {
      let data = await services.DietPlanService.getAllDays();
      let days = data.response;

      setDays(days);
    } catch (err) {
      console.log("err.response", err.response);

      toast.add(
        "tr",
        "danger",
        err.message || err?.response?.data?.code || "Something went wrong"
      );
    }
  };
  useEffect(() => {
    getAllMembers();
    getAllRecipes();
    getData();
    getDays();
  }, []);

  const goBack = () => props.history.push("/admin/diet-plans");
  return !isLoading ? (
    <Container fluid>
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
                    <h2>{isEditing ? "Edit" : "Create"} Diet Plans</h2>
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
                  disabled={isSubmitting}
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
                    setFieldValue={setFieldValue}
                    type="image"
                    link={values.icon}
                    error={errors.icon}
                  />
                </Row>
                <Row>
                  <div className="col-sm-6 form-group">
                    <label htmlFor="">Selected Memebers</label>

                    <AsyncSelect
                      name="members"
                      closeMenuOnSelect={false}
                      isMulti
                      components={animatedComponents}
                      defaultValue={values.members}
                      placeholder="Select Diet Plan Members"
                      loadOptions={getOptions}
                      defaultOptions={memberOptions}
                      // options={memberOptions}
                      onChange={(selectedOption) => {
                        // debugger;
                        setMemebers(selectedOption);
                        setFieldValue("members", selectedOption);
                      }}
                    />
                  </div>
                  <div className="col-sm-4 form-group">
                    <label htmlFor="">Select Range From Monday To Sunday</label>
                    <DateRangePicker
                      name="activeFrom"
                      className="col-sm-6 form-group"
                      onCallback={(start, end, label) => {
                        if (
                          new Date(start).getDay() == 1 &&
                          new Date(end).getDay() == 0
                        ) {
                          setFieldValue(
                            "activeTill",
                            new Date(moment(end).format("YYYY-M-DD HH:mm:ss"))
                          );
                          setFieldValue(
                            "activeFrom",
                            new Date(moment(start).format("YYYY-M-DD HH:mm:ss"))
                          );
                        } else {
                          toast.add(
                            "tr",
                            "danger",
                            "Start day should be monday & end on sunday "
                          );
                        }
                      }}
                      initialSettings={{
                        parentEl: ".unique-class",

                        startDate: values.activeFrom
                          ? moment(values.activeFrom).format(
                            "M/DD/YYYY hh:mm:ss A"
                          )
                          : moment().startOf("hour").toDate(),
                        endDate: values.activeTill
                          ? moment(values.activeTill).format(
                            "M/DD/YYYY hh:mm:ss A"
                          )
                          : moment().startOf("hour").toDate(),
                        locale: {
                          firstDay: 1,
                        },
                      }}
                    >
                      <input type="text" className="form-control" />
                    </DateRangePicker>
                  </div>
                  <div className="col form-group">
                    <label>Active Status</label>
                    <div class="toggleWrapper">
                      <Field
                        name="disabled"
                        type="checkbox"
                        className="form-control"
                        id="toggle"
                      />

                      <label for="toggle" class="toggle"></label>
                    </div>
                  </div>
                </Row>
                <Row></Row>
                {days.length ? (
                  <div className="mt-3 diet-plan-dates-table">
                    <h4>Add Shift Details in Each Day</h4>
                    <Row>
                      <Col className="th">ID</Col>

                      <Col className="th">Day</Col>
                      <Col className="th">Add Shift Details</Col>
                    </Row>
                    {days?.map((day, key) => (
                      <div className={day.toggle ? "collapsed" : ""}>
                        <Row
                          className="head-row"
                          key={key}
                          onClick={() => {
                            let dayArray = days.map((day, i) => {
                              if (i == key) {
                                day["toggle"] = !day["toggle"];
                              } else {
                                day["toggle"] = false;
                              }
                              return day;
                            });

                            setDays([...dayArray]);
                          }}
                        >
                          <Col>{day.id}</Col>

                          <Col>{day.name}</Col>
                          <Col>
                            <span className="editBtn">
                              <i
                                className="fa fa-arrow-down"
                                color="primary"
                              ></i>
                            </span>
                          </Col>
                        </Row>
                        {day.toggle ? (
                          <ShiftDetails
                            day={day}
                            setDays={setDays}
                            recipes={recipes}
                          />
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : null}
              </Card.Body>
            </Card>
          </Form>
        )}
      </Formik>
    </Container>
  ) : (
    <Loader />
  );
};

export default AddOrEditDietPlan;
