import React, { useState, useEffect } from "react";
import { Card, Row, Modal, Button } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useToast } from "components/Toast";
import services from "services";
import Loader from "components/Loader";
import moment from "moment";
import Dynamicform from "./form";

const AddOrEditCare = (props) => {
  const toast = useToast();
  const [roles, setRoles] = useState();
  const [disable, setDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [yes, setYes] = useState(false);
  const [username, setUserName] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [bookRoomData, setBookRoomData] = useState([
    {
      practitioner: "",
      practitionerRole: 0,
      careTeamRole: 0,
      qualification: "",
    },
  ]);
  const [initialValues, setInitialValues] = useState({
    name: "",
    username: "",
    password: "",
    role: "1",
    address: "",
    phone: "",
    cnic: "",
    email: "",
    disabled: 0,
  });
  const getAllRoles = async () => {
    try {
      let data = await services.UsersService.getAllRoles();
      let roles = data.response;
      setRoles(roles);
    } catch (err) {
      console.log("err.response", err.response);

      toast.add(
        "tr",
        "danger",
        err.message || err?.response?.data?.code || "Something went wrong"
      );
    }

    setIsLoading(false);
  };

  const handleValidations = (values) => {
    const errors = {};
    if (!values.deletedAt) {
      if (!values.name) {
        errors.name = "* This field is required";
      }
      if (!values.username) {
        errors.description = "* This field is required";
      }
    }

    return errors;
  };

  // const handleClose = () => {
  //
  //   setShow(false);
  // };

  // const handleYes = (setFieldValue) => {
  //
  //   console.log(show);
  //   setFieldValue(
  //     "deletedAt",
  //     new Date(moment().format("YYYY-M-DD HH:mm:ss"))
  //   );
  //   setShow(false);
  // };

  const handleSubmit = async (values, { setSubmitting }) => {
    let obj = values;

    !isEditing && delete obj.disabled;
    isEditing && username == obj.username && delete obj.username;
    isEditing ? (obj["user"] = values.id) : null;
    isEditing
      ? services.UsersService.updateUser(obj)
          .then((response) => {
            if (values.deletedAt) {
              toast.add("tr", "primary", "User Deleted");
            } else {
              toast.add("tr", "primary", "User Updated");
            }
            goBack();
          })
          .catch((err) => {
            toast.add(
              "tr",
              "danger",
              err?.response?.status == 409
                ? "Add Unique User Name"
                : "Something went wrong"
            );
          })
      : services.UsersService.addUser(obj)
          .then((response) => {
            toast.add("tr", "primary", "User Created");
            goBack();
          })
          .catch((err) => {
            toast.add(
              "tr",
              "danger",
              err?.response?.status == 409
                ? "Add Unique User Name"
                : "Something went wrong"
            );
          });

    setSubmitting(false);
    setDisable(true);
  };

  const getData = async () => {
    try {
      let id = props?.match?.params?.id;
      if (id) {
        let data = await services.UsersService.getUserById(id);
        data = data.response;
        setUserName(data.username ? data.username : "");
        if (!data) {
          throw Error("User not Found");
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
  };

  useEffect(() => {
    getData();
    getAllRoles();
  }, []);

  const handleAddFields = () => {
    debugger;
    const values = [...bookRoomData];
    values.push({
      practitioner: "",
      practitionerRole: 0,
      careTeamRole: 0,
      qualification: "",
    });
    setBookRoomData(values);
  };

  const handleRemoveFields = () => {
    const values = [...bookRoomData];
    if (values.length > 1) values.pop();
    setBookRoomData(values);
  };

  const goBack = () => props.history.push("/admin/care");
  return !isLoading ? (
    <div>
      <Formik
        enableReinitialize
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
                    <h2>{isEditing ? "Edit" : "Create"} Care</h2>
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
                      //
                      // setShow(true);
                      alert("Are You Sure to delete this ??");
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
                {/* <Dynamicform /> */}
                {bookRoomData.map((data, i) => {
                  return (
                    <Row>
                      <div className="col-sm-10 form-group">
                        <Row>
                          <div className="col-sm-3 form-group">
                            <label htmlFor="">Practitioner</label>
                            <Field
                              name="type"
                              className="form-control"
                              as="select"
                            >
                              <option>Please Select type</option>
                              {roles?.map((role, key) => (
                                <option key={key} value={role.id}>
                                  {role.name}
                                </option>
                              ))}
                            </Field>
                            <ErrorMessage
                              name="type"
                              component="small"
                              className="text-danger"
                            />
                          </div>
                          <div className="col-sm-3 form-group">
                            <label htmlFor="">Practitioner Role</label>
                            <Field
                              name="standaredCode"
                              className="form-control"
                              as="select"
                            >
                              <option>Please Select Description</option>
                              {roles?.map((role, key) => (
                                <option key={key} value={role.id}>
                                  {role.name}
                                </option>
                              ))}
                            </Field>
                            <ErrorMessage
                              name="standaredCode"
                              component="small"
                              className="text-danger"
                            />
                          </div>
                          <div className="col-sm-3 form-group">
                            <label htmlFor="">Care Team Role</label>
                            <Field
                              name="nonStandaredCode"
                              className="form-control"
                              type="text"
                              placeholder="Enter Care Team Role"
                            />
                            <ErrorMessage
                              name="nonStandaredCode"
                              component="small"
                              className="text-danger"
                            />
                          </div>
                          <div className="col-sm-3 form-group">
                            <label htmlFor="">Qualification</label>
                            <Field
                              name="nonStandaredCode"
                              className="form-control"
                              type="text"
                              placeholder="Enter None Standared Code"
                            />
                            <ErrorMessage
                              name="nonStandaredCode"
                              component="small"
                              className="text-danger"
                            />
                          </div>
                        </Row>
                      </div>

                      <div className="col-sm-2 form-group">
                        <label htmlFor="">&nbsp;</label>
                        <button
                          className="btn btn-danger mr-2  btn-fill"
                          type="submit"
                          disabled={disable}
                          onClick={handleRemoveFields}
                          // disabled={isSubmitting}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-success mr-2  btn-fill"
                          type="submit"
                          disabled={disable}
                          onClick={handleAddFields}
                          // disabled={isSubmitting}
                        >
                          Add
                        </button>
                      </div>
                    </Row>
                  );
                })}
                {isEditing && (
                  <Row>
                    <div className="col-sm-6 form-group">
                      <label>Active Status</label>
                      <div className="d-flex align-items-center mt-3">
                        <label className="pr-3">Disable</label>
                        <div className="custom-control custom-switch">
                          <Field
                            name="disabled"
                            checked={values.disabled}
                            type="checkbox"
                            className="custom-control-input"
                            id="customSwitch1"
                            onChange={(event) => {
                              setInitialValues({
                                ...initialValues,
                                ["disabled"]: !values.disabled,
                              });
                            }}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customSwitch1"
                          >
                            Enable
                          </label>
                        </div>
                      </div>
                    </div>
                  </Row>
                )}
              </Card.Body>
            </Card>
          </Form>
        )}
      </Formik>
      {/* <Modal show = {show}>
        <Modal.Header className="border-0">
          <Modal.Title className="text-primary">Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Are You Sure to delete this ??
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="primary" onClick= {handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleYes}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>  */}
    </div>
  ) : (
    <Loader />
  );
};

export default AddOrEditCare;
