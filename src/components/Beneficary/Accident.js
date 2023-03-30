import React, { useState } from "react";

// react-bootstrap components
import { Button, Card, Form, Row, Col } from "react-bootstrap";
function Accident() {
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
            <Card.Title as="h4">
              <div className="custom-control custom-switch d-inline-flex justify-content-end align-items-center">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="accident"
                  onChange={onClickInsurancePlanFieldAdd}
                />
                <label className="custom-control-label mb-3" for="accident">
                  Accident
                </label>
              </div>
            </Card.Title>
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
        </Card>
      </Col>
    </Row>
  );
}

export default Accident;
