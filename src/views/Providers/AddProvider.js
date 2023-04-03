import React, { useState, useEffect } from "react";
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";

function AddProvider(props) {
  const [initialValues, setInitialValues] = useState({
    providerNumber: "",
    providerName: "",
    providerStartDate: "",
    providerEndDate: "",
    providerAddress: "",
    providerBankAccount: "",
    providerVatNumber: "",
    providerCRNumber: "",
    providerCRHolderName: "",
    providerEmail: "",
    providerMobile: "",
    providerId: "",
    CeoName: "",
    IdNumber: "",
    emailAddress: "",
    mobileNumber: "",
    accountManagerName: "",
    accountIdNumber: "",
    accountEmailAddress: "",
    accountMobileNumber: "",
    providerTelephoneNumber: "",
    providerFaxNumber: "",
  });

  const goBack = () => props.history.push("/admin/providers");

  const handleValidations = (values) => {
    const errors = {};
    if (!values.providerNumber) {
      errors.providerNumber = "* This field is required";
    }
    if (!values.providerName) {
      errors.providerName = "* This field is required";
    }
    if (!values.providerStartDate || !values.providerStartDate) {
      errors.providerStartDate = "* This field is required";
    }
    if (!values.providerEndDate || !values.providerEndDate) {
      errors.providerEndDate = "* This field is required";
    }
    if (!values.providerAddress || !values.providerAddress) {
      errors.providerAddress = "* This field is required";
    }
    if (!values.providerBankAccount || !values.providerBankAccount) {
      errors.providerBankAccount = "* This field is required";
    }
    if (!values.providerVatNumber || !values.providerVatNumber) {
      errors.providerVatNumber = "* This field is required";
    }
    if (!values.providerCRNumber || !values.providerCRNumber) {
      errors.providerCRNumber = "* This field is required";
    }
    if (!values.providerCRHolderName || !values.providerCRHolderName) {
      errors.providerCRHolderName = "* This field is required";
    }
    if (!values.providerEmail || !values.providerEmail) {
      errors.providerEmail = "* This field is required";
    }
    if (!values.providerMobile || !values.providerMobile) {
      errors.providerMobile = "* This field is required";
    }
    if (!values.providerId || !values.providerId) {
      errors.providerId = "* This field is required";
    }
    if (!values.CeoName || !values.CeoName) {
      errors.CeoName = "* This field is required";
    }
    if (!values.IdNumber || !values.IdNumber) {
      errors.IdNumber = "* This field is required";
    }
    if (!values.emailAddress || !values.emailAddress) {
      errors.emailAddress = "* This field is required";
    }
    if (!values.mobileNumber || !values.mobileNumber) {
      errors.mobileNumber = "* This field is required";
    }
    if (!values.accountManagerName || !values.accountManagerName) {
      errors.accountManagerName = "* This field is required";
    }
    if (!values.accountIdNumber || !values.accountIdNumber) {
      errors.accountIdNumber = "* This field is required";
    }
    if (!values.accountEmailAddress || !values.accountEmailAddress) {
      errors.accountEmailAddress = "* This field is required";
    }
    if (!values.accountMobileNumber || !values.accountMobileNumber) {
      errors.accountMobileNumber = "* This field is required";
    }
    if (!values.providerTelephoneNumber || !values.providerTelephoneNumber) {
      errors.providerTelephoneNumber = "* This field is required";
    }
    if (!values.providerFaxNumber || !values.providerFaxNumber) {
      errors.providerFaxNumber = "* This field is required";
    }

    return errors;
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Row className="mb-3">
              <div className="col">
                <div className="row">
                  <div className="col-sm-4">
                    <h4 className="mb-0 mt-0"><strong>Create Provider</strong></h4>
                  </div>
                </div>
              </div>
              <div className="col-auto">
                <button
                  className="btn btn-light mr-2 btn-sm "
                  type="button"
                  onClick={() => goBack()}
                >
                  Back
                </button>
                <button
                  className="btn btn-secondary mr-2 btn-sm btn-fill"
                  type="submit"
                  // disabled={disable}
                >
                  Delete
                </button>
                <button
                  className="btn btn-success mr-2 btn-sm btn-fill"
                  type="submit"
                  // disabled={disable}
                  // disabled={isSubmitting}
                >
                  Save
                </button>
              </div>
            </Row>
            {/* <div className="mb-3">
              <Button
                // className="btn-fill float-left"
                className="btn btn-light mr-2 "
                type="submit"
                variant="info"
                onClick={() => goBack()}
              >
                Back
              </Button>
              <Button
                className="btn-fill float-right"
                type="submit"
                variant="info"
              >
                Providers
              </Button>
              <div className="clearfix"></div>
            </div> */}
            <Card>
              <Card.Body>
                <Formik
                  initialValues={initialValues}
                  validate={handleValidations}
                  // onSubmit={handleSubmit}
                >
                  {({ isSubmitting, values, setFieldValue }) => (
                    <Form>
                      <Row>
                        <Col className="" md="3">
                          <div className="form-group">
                            <label htmlFor="providerNumber">
                              Provider Number
                            </label>
                            <Field
                              placeholder="Provider123"
                              type="text"
                              name="providerNumber"
                              className="form-control"
                            ></Field>
                            <ErrorMessage
                              name="providerNumber"
                              component="small"
                              className="text-danger"
                            />
                          </div>
                        </Col>
                        <Col className="" md="3">
                          <div className="form-group">
                            <label htmlFor="providerName">Provider Name</label>
                            <Field
                              placeholder="Provider Name"
                              type="text"
                              name="providerName"
                              className="form-control"
                            ></Field>
                            <ErrorMessage
                              name="providerName"
                              component="small"
                              className="text-danger"
                            />
                          </div>
                        </Col>
                        <Col className="" md="3">
                          <div className="form-group">
                            <label htmlFor="providerStartDate">
                              Start Date
                            </label>
                            <Field
                              placeholder="startdate"
                              type="date"
                              className="form-control"
                              name="providerStartDate"
                            ></Field>
                            <ErrorMessage
                              name="providerStartDate"
                              component="small"
                              className="text-danger"
                            />
                          </div>
                        </Col>
                        <Col className="" md="3">
                          <div className="form-group">
                            <label>End Date</label>
                            <Field
                              placeholder="End Date"
                              type="date"
                              className="form-control"
                              name="providerEndDate"
                            ></Field>
                            <ErrorMessage
                              name="providerEndDate"
                              component="small"
                              className="text-danger"
                            />
                          </div>
                        </Col>
                      </Row>
                      
                      <Row>
                        <Col className="" md="3">
                          <div className="form-group">
                            <label>Provider Address</label>
                            <Field
                              placeholder="Provider Address"
                              type="text"
                              className="form-control"
                              name="providerAddress"
                            ></Field>
                            <ErrorMessage
                              name="providerAddress"
                              component="small"
                              className="text-danger"
                            />
                          </div>
                        </Col>
                        <Col className="" md="3">
                          <div className="form-group">
                            <label>Provider Bank Account</label>
                            <Field
                              placeholder="Provider Bank Account"
                              type="text"
                              className="form-control"
                              name="providerBankAccount"
                            ></Field>
                            <ErrorMessage
                              name="providerBankAccount"
                              component="small"
                              className="text-danger"
                            />
                          </div>
                        </Col>
                        <Col className="" md="3">
                          <div className="form-group">
                            <label>Provider Vat Number</label>
                            <Field
                              placeholder="Provider Vat Number"
                              type="text"
                              className="form-control"
                              name="providerVatNumber"
                            ></Field>
                            <ErrorMessage
                              name="providerVatNumber"
                              component="small"
                              className="text-danger"
                            />
                          </div>
                        </Col>
                        <Col className="" md="3">
                          <div className="form-group">
                            <label>Provider CR Number</label>
                            <Field
                              placeholder="Provider CR Number"
                              type="text"
                              className="form-control"
                              name="providerCRNumber"
                            ></Field>
                            <ErrorMessage
                              name="providerCRNumber"
                              component="small"
                              className="text-danger"
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="" md="3">
                          <div className="form-group">
                            <label>Provider CR Holder Name</label>
                            <Field
                              placeholder="Provider CR Holder Name"
                              type="text"
                              className="form-control"
                              name="providerCRHolderName"
                            ></Field>
                            <ErrorMessage
                              name="providerCRHolderName"
                              component="small"
                              className="text-danger"
                            />
                          </div>
                        </Col>
                        <Col className="" md="3">
                          <div className="form-group">
                            <label>Provider Email</label>
                            <Field
                              placeholder="Provider Email"
                              type="text"
                              className="form-control"
                              name="providerEmail"
                            ></Field>
                            <ErrorMessage
                              name="providerEmail"
                              component="small"
                              className="text-danger"
                            />
                          </div>
                        </Col>
                        <Col className="" md="3">
                          <div className="form-group">
                            <label>Provider Mobile</label>
                            <Field
                              placeholder="Provider Mobile"
                              type="text"
                              className="form-control"
                              name="providerMobile"
                            ></Field>
                            <ErrorMessage
                              name="providerMobile"
                              component="small"
                              className="text-danger"
                            />
                          </div>
                        </Col>
                        <Col className="" md="3">
                          <div className="form-group">
                            <label>Provider ID</label>
                            <Field
                              placeholder="Provider ID"
                              type="text"
                              className="form-control"
                              name="providerId"
                            ></Field>
                            <ErrorMessage
                              name="providerId"
                              component="small"
                              className="text-danger"
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="" md="3">
                          <div className="form-group">
                            <label>CEO Name</label>
                            <Field
                              placeholder="CEO Name"
                              type="text"
                              className="form-control"
                              name="CeoName"
                            ></Field>
                            <ErrorMessage
                              name="CeoName"
                              component="small"
                              className="text-danger"
                            />
                          </div>
                        </Col>
                        <Col className="" md="3">
                          <div className="form-group">
                            <label>ID Number</label>
                            <Field
                              placeholder="ID Number"
                              type="text"
                              className="form-control"
                              name="IdNumber"
                            ></Field>
                            <ErrorMessage
                              name="IdNumber"
                              component="small"
                              className="text-danger"
                            />
                          </div>
                        </Col>
                        <Col className="" md="3">
                          <div className="form-group">
                            <label>Email Address</label>
                            <Field
                              placeholder="Email Address"
                              type="text"
                              className="form-control"
                              name="emailAddress"
                            ></Field>
                            <ErrorMessage
                              name="emailAddress"
                              component="small"
                              className="text-danger"
                            />
                          </div>
                        </Col>
                        <Col className="" md="3">
                          <div className="form-group">
                            <label>Mobile Number</label>
                            <Field
                              placeholder="Mobile Number"
                              type="text"
                              className="form-control"
                              name="mobileNumber"
                            ></Field>
                            <ErrorMessage
                              name="mobileNumber"
                              component="small"
                              className="text-danger"
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="" md="3">
                          <div className="form-group">
                            <label>CEO Name</label>
                            <Field
                              placeholder="CEO Name"
                              type="text"
                              className="form-control"
                              name="CeoName"
                            ></Field>
                            <ErrorMessage
                              name="CeoName"
                              component="small"
                              className="text-danger"
                            />
                          </div>
                        </Col>
                        <Col className="" md="3">
                          <div className="form-group">
                            <label>ID Number</label>
                            <Field
                              placeholder="ID Number"
                              type="text"
                              className="form-control"
                              name="IdNumber"
                            ></Field>
                            <ErrorMessage
                              name="IdNumber"
                              component="small"
                              className="text-danger"
                            />
                          </div>
                        </Col>
                        <Col className="" md="3">
                          <div className="form-group">
                            <label>Email Address</label>
                            <Field
                              placeholder="Email Address"
                              type="text"
                              className="form-control"
                              name="emailAddress"
                            ></Field>
                            <ErrorMessage
                              name="emailAddress"
                              component="small"
                              className="text-danger"
                            />
                          </div>
                        </Col>
                        <Col className="" md="3">
                          <div className="form-group">
                            <label>Mobile Number</label>
                            <Field
                              placeholder="Mobile Number"
                              type="text"
                              className="form-control"
                              name="mobileNumber"
                            ></Field>
                            <ErrorMessage
                              name="mobileNumber"
                              component="small"
                              className="text-danger"
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="" md="3">
                          <div className="form-group">
                            <label>Account Manager Name</label>
                            <Field
                              placeholder="Account Manager Name"
                              type="text"
                              className="form-control"
                              name="accountManagerName"
                            ></Field>
                            <ErrorMessage
                              name="accountManagerName"
                              component="small"
                              className="text-danger"
                            />
                          </div>
                        </Col>
                        <Col className="" md="3">
                          <div className="form-group">
                            <label>Account ID Number</label>
                            <Field
                              placeholder="Account ID Number"
                              type="text"
                              className="form-control"
                              name="accountIdNumber"
                            ></Field>
                            <ErrorMessage
                              name="accountIdNumber"
                              component="small"
                              className="text-danger"
                            />
                          </div>
                        </Col>
                        <Col className="" md="3">
                          <div className="form-group">
                            <label>Account Email Address</label>
                            <Field
                              placeholder="Account Email Address"
                              type="text"
                              className="form-control"
                              name="accountEmailAddress"
                            ></Field>
                            <ErrorMessage
                              name="accountEmailAddress"
                              component="small"
                              className="text-danger"
                            />
                          </div>
                        </Col>
                        <Col className="" md="3">
                          <div className="form-group">
                            <label>Account Mobile Number</label>
                            <Field
                              placeholder="Account Mobile Number"
                              type="text"
                              className="form-control"
                              name="accountMobileNumber"
                            ></Field>
                            <ErrorMessage
                              name="accountMobileNumber"
                              component="small"
                              className="text-danger"
                            />
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col className="" md="4">
                          <div className="form-group">
                            <label>Provider telephone number</label>
                            <Field
                              placeholder="Provider telephone number"
                              type="text"
                              className="form-control"
                              name="providerTelephoneNumber"
                            ></Field>
                            <ErrorMessage
                              name="providerTelephoneNumber"
                              component="small"
                              className="text-danger"
                            />
                          </div>
                        </Col>
                        <Col className="" md="4">
                          <div className="form-group">
                            <label>Provider email address</label>
                            <Field
                              placeholder="Provider email address"
                              type="email"
                              className="form-control"
                              name="accountEmailAddress"
                            ></Field>
                            <ErrorMessage
                              name="accountEmailAddress"
                              component="small"
                              className="text-danger"
                            />
                          </div>
                        </Col>
                        <Col className="" md="4">
                          <div className="form-group">
                            <label>Provider Fax number</label>
                            <Field
                              placeholder="Provider Fax number"
                              type="text"
                              className="form-control"
                              name="providerFaxNumber"
                            ></Field>
                            <ErrorMessage
                              name="providerFaxNumber"
                              component="small"
                              className="text-danger"
                            />
                          </div>
                        </Col>
                      </Row>
                      {/* <Button
                        className="btn-fill pull-right"
                        type="submit"
                        variant="success"
                      >
                        Add
                      </Button> */}
                      <div className="clearfix"></div>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AddProvider;
