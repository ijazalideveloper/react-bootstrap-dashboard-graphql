import React, { useState } from "react";

// react-bootstrap components
import { Button, Card, Form, Row, Col } from "react-bootstrap";
import AttachmentForm from "./AttachmentForm";
import { SupportingInfoHook } from "../../hooks/BeneficaryHook/SupportingInfoHook";
function SupportingInfo() {
  const {
    supportingInfoAttachmentForm,
    setSupportingInfoAttachmentForm,
    onClicksetSupportingInfoAttachmentForm,
  } = SupportingInfoHook();
  const [createNewBeneficaryField, setCreateNewBeneficaryField] =
    useState(false);

  const onClickInsurancePlanFieldAdd = () => {
    setCreateNewBeneficaryField(!createNewBeneficaryField);
  };
  return (
    <Row>
      <Col md="12">
        <Card>
          <Card.Header>
            <Card.Title as="h4">Supporting Info</Card.Title>
            <div className="my-2">
              <Button
                className="btn-fill btn-sm mx-1 my-1 rounded"
                type="button"
                variant="info"
                onClick={onClicksetSupportingInfoAttachmentForm}
              >
                Attachment +
              </Button>
              <Button
                className="btn-fill btn-sm mx-1 my-1  rounded"
                type="button"
                variant="info"
              >
                Birth Weight +
              </Button>
              <Button
                className="btn-fill btn-sm  mx-1 my-1  rounded"
                type="button"
                variant="info"
              >
                Cheif Complaint +
              </Button>
              <Button
                className="btn-fill btn-sm mx-1 my-1  rounded"
                type="button"
                variant="info"
              >
                Days Supply +
              </Button>
              <Button
                className="btn-fill btn-sm mx-1 my-1 rounded"
                type="button"
                variant="info"
              >
                Employment Impacted +
              </Button>
              <Button
                className="btn-fill btn-sm mx-1 my-1 rounded"
                type="button"
                variant="info"
              >
                Hospitalized +
              </Button>
              <Button
                className="btn-fill btn-sm mx-1 my-1 rounded"
                type="button"
                variant="info"
              >
                ICU Hours +
              </Button>
              <Button
                className="btn-fill btn-sm mx-1 my-1 rounded"
                type="button"
                variant="info"
              >
                Info +
              </Button>
              <Button
                className="btn-fill btn-sm mx-1 my-1 rounded"
                type="button"
                variant="info"
              >
                Lab Test +
              </Button>
              <Button
                className="btn-fill btn-sm mx-1 my-1  rounded"
                type="button"
                variant="info"
              >
                Last Menstrual Period +
              </Button>
              <Button
                className="btn-fill btn-sm mx-1 my-1  rounded"
                type="button"
                variant="info"
              >
                Missing Tooth+
              </Button>
              <Button
                className="btn-fill btn-sm mx-1 my-1 rounded"
                type="button"
                variant="info"
              >
                Onset+
              </Button>
              <Button
                className="btn-fill btn-sm mx-1 my-1 rounded"
                type="button"
                variant="info"
              >
                Oxygen Saturation+
              </Button>
              <Button
                className="btn-fill btn-sm mx-1 my-1 rounded"
                type="button"
                variant="info"
              >
                Pulse+
              </Button>
              <Button
                className="btn-fill btn-sm mx-1 my-1 rounded"
                type="button"
                variant="info"
              >
                Reason for Visit +
              </Button>
              <Button
                className="btn-fill btn-sm mx-1 my-1 rounded"
                type="button"
                variant="info"
              >
                Respiratory Rate +
              </Button>
              <Button
                className="btn-fill btn-sm mx-1 my-1 rounded"
                type="button"
                variant="info"
              >
                Temperature +
              </Button>
              <Button
                className="btn-fill btn-sm mx-1 my-1 rounded"
                type="button"
                variant="info"
              >
                Ventilation Hours +
              </Button>
              <Button
                className="btn-fill btn-sm mx-1 my-1 rounded"
                type="button"
                variant="info"
              >
                Vital Sign Diastolic +
              </Button>
              <Button
                className="btn-fill btn-sm mx-1 my-1 rounded"
                type="button"
                variant="info"
              >
                Vital Sign Systolic +
              </Button>
              <Button
                className="btn-fill btn-sm mx-1 my-1 rounded"
                type="button"
                variant="info"
              >
                Vital Sign Weight +
              </Button>
            </div>
          </Card.Header>
          {createNewBeneficaryField && (
            <Card.Body>
              <Form>
                <Row>
                  <Col className="" md="4">
                    <Form.Group>
                      <label class="form-check-label">Accident Type</label>
                      <select class="custom-select" id="gender2">
                        <option selected>Choose...</option>
                        <option value="1">Institution</option>
                        <option value="2">Institution 1</option>
                      </select>
                    </Form.Group>
                  </Col>
                  <Col className="" md="4">
                    <Form.Group>
                      <label>Street Name</label>
                      <Form.Control
                        placeholder="Eligibility Response Identifier"
                        type="text"
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col className="" md="4">
                    <Form.Group>
                      <label>City</label>
                      <Form.Control
                        placeholder="Eligibility Response Identifier"
                        type="text"
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col className="" md="4">
                    <Form.Group>
                      <label>State/ Provoince</label>
                      <Form.Control
                        placeholder="State/ Provoince"
                        type="text"
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col className="" md="4">
                    <Form.Group>
                      <label class="form-check-label">Country</label>
                      <Col className="" md="12">
                        <select class="custom-select" id="gender2">
                          <option selected>Choose...</option>
                          <option value="1">Institution</option>
                          <option value="2">Institution 1</option>
                        </select>
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col className="" md="4">
                    <Form.Group>
                      <label>Date</label>
                      <Form.Control
                        placeholder="Date"
                        type="date"
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          )}

          {supportingInfoAttachmentForm && <AttachmentForm />}
        </Card>
      </Col>
    </Row>
  );
}

export default SupportingInfo;
