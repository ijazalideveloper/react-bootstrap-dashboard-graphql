import React, { useState, useEffect } from "react";
import { Card, Row, Modal, Button } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useToast } from "components/Toast";
import services from "services";
import Loader from "components/Loader";
import moment from "moment";
const AddOrEditUser = (props) => {
  const toast = useToast();
  const [roles, setRoles] = useState();
  const [disable, setDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [yes, setYes] = useState(false);
  const [username, setUserName] = useState("");
  const [isEditing, setIsEditing] = useState(null);
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

  const goBack = () => props.history.push("/admin/users");
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
                    <h2>{isEditing ? "Edit" : "Create"} Provider</h2>
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
                <Row>
                  <div className="col-sm-6 form-group">
                    <label htmlFor="">Provider Number</label>
                    <Field name="name" className="form-control" type="text" />
                    <ErrorMessage
                      name="name"
                      component="small"
                      className="text-danger"
                    />
                  </div>
                  <div className="col-sm-6 form-group">
                    <label htmlFor="">Provider Name</label>
                    <Field
                      name="username"
                      className="form-control"
                      type="text"
                    />
                    <ErrorMessage
                      name="username"
                      component="small"
                      className="text-danger"
                    />
                  </div>
                </Row>
                <Row>
                  <div className="col-sm-6 form-group">
                    <label htmlFor="">Provider Number</label>
                    <Field name="email" className="form-control" type="text" />
                    <ErrorMessage
                      name="email"
                      component="small"
                      className="text-danger"
                    />
                  </div>
                  <div className="col-sm-6 form-group">
                    <label htmlFor="">Start Date</label>
                    <Field
                      name="password"
                      className="form-control"
                      type="date"
                    />
                    <ErrorMessage
                      name="password"
                      component="small"
                      className="text-danger"
                    />
                  </div>
                </Row>
                <Row>
                  <div className="col-sm-6 form-group">
                    <label htmlFor="">Provider Address</label>
                    <Field name="phone" className="form-control" type="text" />
                    <ErrorMessage
                      name="phone"
                      component="small"
                      className="text-danger"
                    />
                  </div>
                  <div className="col-sm-6 form-group">
                    <label htmlFor="">Provider Bank Account Number</label>
                    <Field name="cnic" className="form-control" type="text" />
                    <ErrorMessage
                      name="cnic"
                      component="small"
                      className="text-danger"
                    />
                  </div>
                </Row>
                <Row>
                  <div className="col-sm-6 form-group">
                    <label htmlFor="">Provider Vat Number</label>
                    <Field
                      className="form-control"
                      type="text"
                      rows={1}
                      name="address"
                      placeholder="Provider Vat Number"
                    />
                    <ErrorMessage
                      name="role"
                      component="small"
                      className="text-danger"
                    />
                  </div>
                  <div className="col-sm-6 form-group">
                    <label>Provider CR Number</label>
                    <Field
                      className="form-control"
                      type="text"
                      rows={1}
                      name="address"
                      placeholder="Address"
                    />
                    <ErrorMessage
                      name="address"
                      component="small"
                      className="text-danger"
                    />
                  </div>
                </Row>
                <Row>
                  <div className="col-sm-6 form-group">
                    <label htmlFor="">
                      Provider CR Holder Name / Email Address/ Mobile /ID
                      Number.
                    </label>
                    <Field
                      className="form-control"
                      type="text"
                      rows={1}
                      name="address"
                      placeholder="Provider CR Holder Name / Email Address/ Mobile /ID Number."
                    />
                    <ErrorMessage
                      name="role"
                      component="small"
                      className="text-danger"
                    />
                  </div>
                  <div className="col-sm-6 form-group">
                    <label>
                      CEO Name/ ID Number/Email Address/ Mobile Number
                    </label>
                    <Field
                      className="form-control"
                      type="text"
                      rows={1}
                      name="address"
                      placeholder="CEO Name/ ID Number/Email Address/ Mobile Number"
                    />
                    <ErrorMessage
                      name="address"
                      component="small"
                      className="text-danger"
                    />
                  </div>
                </Row>
                <Row>
                  <div className="col-sm-6 form-group">
                    <label htmlFor="">
                      Account Manager Name/ID Number / Email Address/Mobile
                      Number
                    </label>
                    <Field
                      className="form-control"
                      type="text"
                      rows={1}
                      name="address"
                      placeholder="Account Manager Name/ID Number / Email Address/Mobile Number"
                    />
                    <ErrorMessage
                      name="role"
                      component="small"
                      className="text-danger"
                    />
                  </div>
                  <div className="col-sm-6 form-group">
                    <label>Provider Telephone Number</label>
                    <Field
                      className="form-control"
                      type="text"
                      rows={1}
                      name="address"
                      placeholder="Address"
                    />
                    <ErrorMessage
                      name="address"
                      component="small"
                      className="text-danger"
                    />
                  </div>
                </Row>
                <Row>
                  <div className="col-sm-6 form-group">
                    <label htmlFor="">Provider Email Address</label>
                    <Field
                      className="form-control"
                      type="text"
                      rows={1}
                      name="address"
                      placeholder="Provider Email Address"
                    />
                    <ErrorMessage
                      name="role"
                      component="small"
                      className="text-danger"
                    />
                  </div>
                  <div className="col-sm-6 form-group">
                    <label>Provider Fax Number</label>
                    <Field
                      className="form-control"
                      type="text"
                      rows={1}
                      name="address"
                      placeholder="Address"
                    />
                    <ErrorMessage
                      name="address"
                      component="small"
                      className="text-danger"
                    />
                  </div>
                </Row>
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

export default AddOrEditUser;
