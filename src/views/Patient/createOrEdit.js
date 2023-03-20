import React, { useState, useEffect } from "react";
import { Card, Row, Modal, Button } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useToast } from "components/Toast";
import services from "services";
import Loader from "components/Loader";
import moment from "moment";
const AddOrEditPatient = (props) => {
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

  const goBack = () => props.history.push("/admin/patient");
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
                  <div className="col-sm-4 form-group">
                    <label htmlFor="">Type</label>
                    <Field name="type" className="form-control" as="select">
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
                  <div className="col-sm-4 form-group">
                    <label htmlFor="">Standared Code - Description</label>
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
                  <div className="col-sm-4 form-group">
                    <label htmlFor="">None Standared Code</label>
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
                <Row>
                  <div className="col-sm-4 form-group">
                    <label htmlFor="">None Standared Description</label>
                    <Field
                      name="noneStandaredDescription"
                      className="form-control"
                      type="text"
                      placeholder="Enter None Standared Description"
                    />
                    <ErrorMessage
                      name="noneStandaredDescription"
                      component="small"
                      className="text-danger"
                    />
                  </div>
                  <div className="col-sm-4 form-group">
                    <label htmlFor="">Body Site</label>
                    <Field name="bodySite" className="form-control" as="select">
                      <option>Please Select</option>
                      {roles?.map((role, key) => (
                        <option key={key} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="bodySite"
                      component="small"
                      className="text-danger"
                    />
                  </div>
                  <div className="col-sm-4 form-group">
                    <label htmlFor="">Sub Site</label>
                    <Field name="subSite" className="form-control" as="select">
                      <option>Please Select</option>
                      {roles?.map((role, key) => (
                        <option key={key} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="subSite"
                      component="small"
                      className="text-danger"
                    />
                  </div>
                </Row>
                <Row>
                  <div className="col-sm-4 form-group">
                    <label htmlFor="">Service Start Date</label>
                    <Field
                      name="startDate"
                      className="form-control"
                      type="date"
                    />
                    <ErrorMessage
                      name="startDate"
                      component="small"
                      className="text-danger"
                    />
                  </div>
                  <div className="col-sm-4 form-group">
                    <label htmlFor="">Service End Date</label>
                    <Field
                      className="form-control"
                      type="date"
                      name="endDate"
                      placeholder="dd/mm/yyy"
                    />
                    <ErrorMessage
                      name="endDate"
                      component="small"
                      className="text-danger"
                    />
                  </div>
                  <div className="col-sm-4 form-group">
                    <label>Supporting Info</label>
                    <Field
                      name="supportingInfo"
                      className="form-control"
                      as="select"
                    >
                      <option>Please Select</option>
                      {roles?.map((role, key) => (
                        <option key={key} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="supportingInfo"
                      component="small"
                      className="text-danger"
                    />
                  </div>
                </Row>
                <Row>
                  <div className="col-sm-4 form-group">
                    <label htmlFor="">Diagnosis</label>
                    <Field
                      name="diagnosis"
                      className="form-control"
                      as="select"
                    >
                      <option>Please select</option>
                      {roles?.map((role, key) => (
                        <option key={key} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="diagnosis"
                      component="small"
                      className="text-danger"
                    />
                  </div>
                  <div className="col-sm-4 form-group">
                    <label>Care Teams</label>
                    <Field name="careTeam" className="form-control" as="select">
                      <option>Please select</option>
                      {roles?.map((role, key) => (
                        <option key={key} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="careTeam"
                      component="small"
                      className="text-danger"
                    />
                  </div>
                  <div className="col-sm-4 form-group">
                    <label htmlFor="">Is Package</label>
                    <Field
                      name="isPackage"
                      className="form-control"
                      as="select"
                    >
                      <option>Please select</option>
                      {roles?.map((role, key) => (
                        <option key={key} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="isPackage"
                      component="small"
                      className="text-danger"
                    />
                  </div>
                </Row>
                <Row>
                  <div className="col-sm-6 form-group">
                    <Row>
                      <div className="col-sm-6 form-group">
                        <label>Quantity</label>
                        <Field
                          className="form-control"
                          type="text"
                          name="quantity"
                          placeholder="Enter Quantity"
                        />
                        <ErrorMessage
                          name="quantity"
                          component="small"
                          className="text-danger"
                        />
                      </div>
                      <div className="col-sm-6 form-group">
                        <label htmlFor="">Unit Price</label>
                        <Field
                          className="form-control"
                          type="text"
                          name="unitPrice"
                          placeholder="Unit Price"
                        />
                        <ErrorMessage
                          name="unitPrice"
                          component="small"
                          className="text-danger"
                        />
                      </div>
                    </Row>
                    <Row>
                      <div className="col-sm-6 form-group">
                        <label htmlFor="">Patient Share (%)</label>
                        <Field
                          className="form-control"
                          type="text"
                          name="patientShare"
                          placeholder="Enter Patient Share"
                        />
                        <ErrorMessage
                          name="patientShare"
                          component="small"
                          className="text-danger"
                        />
                      </div>
                      <div className="col-sm-6 form-group">
                        <label>Discount Amount</label>
                        <Field
                          className="form-control"
                          type="text"
                          name="discountAmount"
                          placeholder="Address"
                        />
                        <ErrorMessage
                          name="discountAmount"
                          component="small"
                          className="text-danger"
                        />
                      </div>
                    </Row>
                  </div>
                  <div className="col-sm-6 form-group">
                    <Row>
                      <div className="col-sm-4 form-group">
                        <label htmlFor="">Tax Amount</label>
                        <Field
                          className="form-control"
                          type="text"
                          name="taxAmount"
                          placeholder="Enter Tax"
                        />
                        <ErrorMessage
                          name="taxAmount"
                          component="small"
                          className="text-danger"
                        />
                      </div>
                      <div className="col-sm-4 form-group">
                        <label>Factor</label>
                        <Field
                          className="form-control"
                          type="text"
                          name="factor"
                          placeholder="Enter Factor"
                        />
                        <ErrorMessage
                          name="factor"
                          component="small"
                          className="text-danger"
                        />
                      </div>
                      <div className="col-sm-4 form-group">
                        <label>Net</label>
                        <Field
                          className="form-control"
                          type="text"
                          name="net"
                          placeholder="Enter Net"
                        />
                        <ErrorMessage
                          name="net"
                          component="small"
                          className="text-danger"
                        />
                      </div>
                    </Row>
                    <Row>
                      <div className="col-sm-6 form-group">
                        <label htmlFor="">Patient Share Amount</label>
                        <Field
                          className="form-control"
                          type="text"
                          name="patientShareAmount"
                          placeholder="Enter Patient Share Amount"
                        />
                        <ErrorMessage
                          name="patientShareAmount"
                          component="small"
                          className="text-danger"
                        />
                      </div>
                      <div className="col-sm-6 form-group">
                        <label>Payer Share</label>
                        <Field
                          className="form-control"
                          type="text"
                          name="payerShare"
                          placeholder="Enter Payer Share"
                        />
                        <ErrorMessage
                          name="payerShare"
                          component="small"
                          className="text-danger"
                        />
                      </div>
                    </Row>
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

export default AddOrEditPatient;
