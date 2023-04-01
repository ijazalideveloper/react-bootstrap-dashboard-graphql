import React, { useState } from "react";

// react-bootstrap components
import { Button, Card, Form, Row, Col } from "react-bootstrap";
function PreAuthorizationForm() {
  return (
    <Card>
      <Card.Header>
        <Card.Title as="h4">Pre Authorization Info</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form>
          <Row>
            <Col md="4">
              <Form.Group>
                <label class="form-check-label">Date Ordered</label>
                <Form.Control
                  placeholder="Date Ordered"
                  type="date"
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col md="4">
              <Form.Group>
                <label class="form-check-label">Type</label>
                <select class="custom-select" id="gender2">
                  <option selected>Choose...</option>
                  <option value="1">Institution</option>
                  <option value="2">Institution 1</option>
                </select>
              </Form.Group>
            </Col>
            <Col md="4">
              <Form.Group>
                <label class="form-check-label">Sub Type</label>
                <select class="custom-select" id="gender2">
                  <option selected>Choose...</option>
                  <option value="1">Out Patient</option>
                  <option value="2">Institution 1</option>
                </select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <Form.Group>
                <label class="form-check-label">
                  Eligibility Response Identifier(value)
                </label>
                <Form.Control
                  placeholder="Eligibility Response Identifier"
                  type="text"
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col md="4">
              <Form.Group>
                <label class="form-check-label">
                  Eligibility Response Identifier (URL)
                </label>
                <Form.Control
                  placeholder="Eligibility Response Identifier(URL)"
                  type="text"
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col md="4">
              <Form.Group>
                <label class="form-check-label">Offline Eligibility ID</label>
                <Form.Control
                  placeholder="Offline Eligibility ID"
                  type="text"
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <Form.Group>
                <label>Offline Eligibility Date</label>
                <Form.Control
                  placeholder="Offline Eligibility Date"
                  type="date"
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col md="4">
              <Form.Group>
                <label class="form-check-label">Payee Type</label>
                <select class="custom-select" id="gender2">
                  <option selected>Choose...</option>
                  <option value="1">Institution</option>
                  <option value="2">Institution 1</option>
                </select>
              </Form.Group>
            </Col>
            <Col md="4">
              <Form.Group>
                <label class="form-check-label">Payee</label>
                <select class="custom-select" id="gender2">
                  <option selected>Choose...</option>
                  <option value="1">Institution</option>
                  <option value="2">Institution 1</option>
                </select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <Form.Group>
                <label class="form-check-label">
                  Related Preauthorization Refernce No(s)
                </label>
                <Form.Control
                  placeholder="Related Preauthorization Refernce No(s"
                  type="date"
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col className="px-1" md="4">
              <Form.Group>
                <label class="form-check-label">Referring provider</label>
                <select class="custom-select" id="gender2">
                  <option selected>Choose...</option>
                  <option value="1">Institution</option>
                  <option value="2">Institution 1</option>
                </select>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default PreAuthorizationForm;
