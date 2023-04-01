import React, { useState } from "react";
// react-bootstrap components
import { Button, Card, Form, Row, Col, Modal } from "react-bootstrap";

function AddItemForm() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Row>
      <Col md="12">
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          className="addBeneficaryItemCustomClass"
          // dialogClassName="modal-90w"
          // fullscreen="xxl-down"
          size="xl"
        >
          <Modal.Header closeButton className="mb-0">
            <Modal.Title className="mb-0 mt-0">
              <strong>Add Price List</strong>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row className="mb-3">
                <Col className="" md="3">
                  <Form.Group>
                    <label className="form-check-label">Type</label>

                    <select class="custom-select" id="gender2">
                      <option selected>Choose...</option>
                      <option value="1">Institution</option>
                      <option value="2">Institution 1</option>
                    </select>
                  </Form.Group>
                </Col>
                <Col className="" md="3">
                  <Form.Group>
                    <label class="form-check-label">
                      Standard Code-Description
                    </label>
                    <select class="custom-select" id="gender2">
                      <option selected>Choose...</option>
                      <option value="1">Institution</option>
                      <option value="2">Institution 1</option>
                    </select>
                  </Form.Group>
                </Col>
                <Col className="" md="3">
                  <Form.Group>
                    <label class="form-check-label">Non Standard Code</label>
                    <Form.Control
                      placeholder="Enter Non Standard Code"
                      type="text"
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col className="" md="3">
                  <Form.Group>
                    <label class="form-check-label">Non Standard Description</label>
                    <Form.Control
                      placeholder="Non Standard Description"
                      type="text"
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col className="" md="3">
                  <Form.Group>
                    <label class="form-check-label">Body Site</label>

                    <select class="custom-select" id="gender2">
                      <option selected>Choose...</option>
                      <option value="1">Institution</option>
                      <option value="2">Institution 1</option>
                    </select>
                  </Form.Group>
                </Col>
                <Col className="" md="3">
                  <Form.Group>
                    <label class="form-check-label">Sub Site</label>

                    <select class="custom-select" id="gender2">
                      <option selected>Choose...</option>
                      <option value="1">Institution</option>
                      <option value="2">Institution 1</option>
                    </select>
                  </Form.Group>
                </Col>
                <Col className="" md="3">
                  <Form.Group>
                    <label>Service Start Date</label>
                    <Form.Control placeholder="Date" type="date"></Form.Control>
                  </Form.Group>
                </Col>
                <Col className="" md="3">
                  <Form.Group>
                    <label>Service End Date</label>
                    <Form.Control placeholder="Date" type="date"></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col className="" md="3">
                  <Form.Group>
                    <label class="form-check-label">Supporting Info</label>

                    <select class="custom-select" id="gender2">
                      <option selected>Choose...</option>
                      <option value="1">Institution</option>
                      <option value="2">Institution 1</option>
                    </select>
                  </Form.Group>
                </Col>
                <Col className="" md="3">
                  <Form.Group>
                    <label class="form-check-label">Diagnosis</label>
                    <select class="custom-select" id="gender2">
                      <option selected>Choose...</option>
                      <option value="1">Institution</option>
                      <option value="2">Institution 1</option>
                    </select>
                  </Form.Group>
                </Col>
                <Col className="" md="3">
                  <Form.Group>
                    <label class="form-check-label">Care Team</label>
                    <select class="custom-select" id="gender2">
                      <option selected>Choose...</option>
                      <option value="1">Institution</option>
                      <option value="2">Institution 1</option>
                    </select>
                  </Form.Group>
                </Col>
                <Col className="" md="3">
                  <Form.Group>
                    <label class="form-check-label">Is Package?</label>
                    <select class="custom-select" id="gender2">
                      <option selected>Choose...</option>
                      <option value="1">Institution</option>
                      <option value="2">Institution 1</option>
                    </select>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col className="" md="3">
                  <Form.Group>
                    <label className="form-check-label">Quantity</label>
                    <Form.Control
                      placeholder="Enter Quantity"
                      type="text"
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col className="" md="2">
                  <Form.Group>
                    <label className="form-check-label">Unit Price</label>
                    <Form.Control
                      placeholder="Enter Unit Price"
                      type="number"
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col className="" md="1"></Col>
                <Col className="" md="2">
                  <Form.Group>
                    <label className="form-check-label">Tax Amount</label>
                    <Form.Control
                      placeholder="Enter Tax Amount"
                      type="number"
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col className="" md="2">
                  <Form.Group>
                    <label className="form-check-label">Factor</label>
                    <Form.Control
                      placeholder="Enter Factor"
                      type="number"
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col className="" md="2">
                  <Form.Group>
                    <label className="form-check-label">Net</label>
                    <Form.Control
                      placeholder="Enter Net"
                      type="number"
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col className="" md="3">
                  <Form.Group>
                    <label className="form-check-label">Discount Amount</label>
                    <Form.Control
                      placeholder="Enter Discount Amount"
                      type="text"
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col className="" md="2">
                  <Form.Group>
                    <label className="form-check-label">Patient Share (%)</label>
                    <Form.Control
                      placeholder="Enter Patient Share"
                      type="text"
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col
                  className="d-flex justify-content-center align-items-center"
                  md="1"
                >
                  <svg
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  >
                    <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
                  </svg>
                </Col>
                <Col className="" md="3">
                  <Form.Group>
                    <label>Patient Share Amount</label>
                    <Form.Control
                      placeholder="Enter Patient Share Amount"
                      type="text"
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col className="" md="3">
                  <Form.Group>
                    <label>Payer Share</label>
                    <Form.Control
                      placeholder="Enter Payer Share"
                      type="text"
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary">Understood</Button>
          </Modal.Footer>
        </Modal>
        <Card>
          <Card.Header>
            <Card.Title as="h4">
              Add Item{" "}
              <Button
                variant="primary"
                className="float-right"
                onClick={handleShow}
              >
                Add Price List
              </Button>
            </Card.Title>
          </Card.Header>
          <Card.Body></Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default AddItemForm;
