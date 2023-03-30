import React from "react";

// react-bootstrap components
import CareTeamForm from '../components/Beneficary/CareTeam';
import Accident from "components/Beneficary/Accident";
import {
  Badge,
  Button,
  Card,
  Form,
  Select,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function Beneficary() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title
                  as="h4"
                  className="d-flex justify-content-between align-items-center"
                >
                  <b>Beneficary Info</b>
                  <div className="custom-control custom-switch d-inline-flex justify-content-end align-items-center">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customSwitch1"
                    />
                    <label
                      className="custom-control-label mb-0"
                      for="customSwitch1"
                    >
                      Referral
                    </label>
                  </div>
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <div class="form-check d-flex justify-content-start align-items-center">
                          <input
                            style={{ marginTop: "-1px" }}
                            class="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                          />
                          <label
                            style={{ paddingLeft: "4px" }}
                            class="form-check-label"
                            for="flexRadioDefault1"
                          >
                            {" "}
                            New Born{" "}
                          </label>
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="justify-content-between">
                    <Col className="pr-1" md="5">
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Search this blog"
                        />
                        <div class="input-group-append">
                          <button
                            class="btn btn-secondary search_btn_beneficary"
                            type="button"
                          >
                            <i class="fa fa-search"></i>
                          </button>
                        </div>
                      </div>
                    </Col>
                    <Col
                      className="pr-1 d-flex justify-content-start align-items-center"
                      md="2"
                    >
                      <label
                        style={{ paddingLeft: "4px" }}
                        class="form-check-label"
                        for="flexRadioDefault1"
                      >
                        {" "}
                        OR{" "}
                      </label>
                    </Col>
                    <Col className="pr-1" md="5">
                      <Button
                        className="btn-fill float-right mr-4"
                        type="submit"
                        variant="info"
                      >
                        Create New Beneficary
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label class="form-check-label">Insurance Plans</label>
                        <Col className="pr-1" md="12">
                          <select class="custom-select" id="gender2">
                            <option selected>Choose...</option>
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                          </select>
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>

            <Card>
              <Card.Header>
                <Card.Title as="h4">Pre Authorization Info</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Date Ordered</label>
                        <Form.Control
                          placeholder="Date Ordered"
                          type="date"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label class="form-check-label">Type</label>
                        <Col className="pr-1" md="12">
                          <select class="custom-select" id="gender2">
                            <option selected>Choose...</option>
                            <option value="1">Institution</option>
                            <option value="2">Institution 1</option>
                          </select>
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label class="form-check-label">Sub Type</label>
                        <Col className="pr-1" md="12">
                          <select class="custom-select" id="gender2">
                            <option selected>Choose...</option>
                            <option value="1">Out Patient</option>
                            <option value="2">Institution 1</option>
                          </select>
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Eligibility Response Identifier(value)</label>
                        <Form.Control
                          placeholder="Eligibility Response Identifier"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Eligibility Response Identifier (URL)</label>
                        <Form.Control
                          placeholder="Eligibility Response Identifier(URL)"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Offline Eligibility ID</label>
                        <Form.Control
                          placeholder="Offline Eligibility ID"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Offline Eligibility Date</label>
                        <Form.Control
                          placeholder="Offline Eligibility Date"
                          type="date"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label class="form-check-label">Payee Type</label>
                        <Col className="pr-1" md="12">
                          <select class="custom-select" id="gender2">
                            <option selected>Choose...</option>
                            <option value="1">Institution</option>
                            <option value="2">Institution 1</option>
                          </select>
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label class="form-check-label">Payee</label>
                        <Col className="pr-1" md="12">
                          <select class="custom-select" id="gender2">
                            <option selected>Choose...</option>
                            <option value="1">Institution</option>
                            <option value="2">Institution 1</option>
                          </select>
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Related Preauthorization Refernce No(s)</label>
                        <Form.Control
                          placeholder="Related Preauthorization Refernce No(s"
                          type="date"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label class="form-check-label">
                          Referring provider
                        </label>
                        <Col className="pr-1" md="12">
                          <select class="custom-select" id="gender2">
                            <option selected>Choose...</option>
                            <option value="1">Institution</option>
                            <option value="2">Institution 1</option>
                          </select>
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>

            <CareTeamForm />

            <Card>
              <Card.Header>
                <Card.Title as="h4">
                  Diagnosis
                  <Button
                    className="btn-fill float-right rounded"
                    type="submit"
                    variant="info"
                  >
                    +
                  </Button>
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="3">
                      <Form.Group>
                        <Form.Control
                          placeholder="Eligibility Response Identifier"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>

                    <Col className="py-0" md="3">
                      <Form.Group>
                        <Col className="pr-1" md="12">
                          <select class="custom-select" id="gender2">
                            <option selected>Choose...</option>
                            <option value="1">Institution</option>
                            <option value="2">Institution 1</option>
                          </select>
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col className="py-0" md="3">
                      <Form.Group>
                        <Col className="pr-1" md="12">
                          <select class="custom-select" id="gender2">
                            <option selected>Choose...</option>
                            <option value="1">Institution</option>
                            <option value="2">Institution 1</option>
                          </select>
                        </Col>
                      </Form.Group>
                    </Col>

                    <Col className="py-0" md="3">
                      <Button
                        className="btn-fill pull-right"
                        type="submit"
                        variant="info"
                      >
                        <i className="nc-icon nc-simple-remove"></i>
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>

            
            <Accident></Accident>
            
            <Card>
              <Card.Header>
                <Card.Title as="h4">Add Item</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label class="form-check-label">Type</label>
                        <Col className="pr-1" md="12">
                          <select class="custom-select" id="gender2">
                            <option selected>Choose...</option>
                            <option value="1">Institution</option>
                            <option value="2">Institution 1</option>
                          </select>
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="3">
                      <Form.Group>
                        <label class="form-check-label">
                          Standard Code-Description
                        </label>
                        <Col className="pr-1" md="12">
                          <select class="custom-select" id="gender2">
                            <option selected>Choose...</option>
                            <option value="1">Institution</option>
                            <option value="2">Institution 1</option>
                          </select>
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="3">
                      <Form.Group>
                        <label>Non Standard Code</label>
                        <Form.Control
                          placeholder="Enter Non Standard Code"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="3">
                      <Form.Group>
                        <label>Non Standard Description</label>
                        <Form.Control
                          placeholder="Non Standard Description"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="3">
                      <Form.Group>
                        <label class="form-check-label">Body Site</label>
                        <Col className="pr-1" md="12">
                          <select class="custom-select" id="gender2">
                            <option selected>Choose...</option>
                            <option value="1">Institution</option>
                            <option value="2">Institution 1</option>
                          </select>
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label class="form-check-label">Sub Site</label>
                        <Col className="pr-1" md="12">
                          <select class="custom-select" id="gender2">
                            <option selected>Choose...</option>
                            <option value="1">Institution</option>
                            <option value="2">Institution 1</option>
                          </select>
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Service Start Date</label>
                        <Form.Control
                          placeholder="Date"
                          type="date"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Service End Date</label>
                        <Form.Control
                          placeholder="Date"
                          type="date"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="3">
                      <Form.Group>
                        <label class="form-check-label">Supporting Info</label>
                        <Col className="pr-1" md="12">
                          <select class="custom-select" id="gender2">
                            <option selected>Choose...</option>
                            <option value="1">Institution</option>
                            <option value="2">Institution 1</option>
                          </select>
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label class="form-check-label">Diagnosis</label>
                        <Col className="pr-1" md="12">
                          <select class="custom-select" id="gender2">
                            <option selected>Choose...</option>
                            <option value="1">Institution</option>
                            <option value="2">Institution 1</option>
                          </select>
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label class="form-check-label">Care Team</label>
                        <Col className="pr-1" md="12">
                          <select class="custom-select" id="gender2">
                            <option selected>Choose...</option>
                            <option value="1">Institution</option>
                            <option value="2">Institution 1</option>
                          </select>
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label class="form-check-label">Is Package?</label>
                        <Col className="pr-1" md="12">
                          <select class="custom-select" id="gender2">
                            <option selected>Choose...</option>
                            <option value="1">Institution</option>
                            <option value="2">Institution 1</option>
                          </select>
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="3">
                      <Form.Group>
                        <label>Quantity</label>
                        <Form.Control
                          placeholder="Enter Quantity"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="2">
                      <Form.Group>
                        <label>Unit Price</label>
                        <Form.Control
                          placeholder="Enter Unit Price"
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="1"></Col>
                    <Col className="px-1" md="1">
                      <Form.Group>
                        <label>Tax Amount</label>
                        <Form.Control
                          placeholder="Enter Tax Amount"
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="2">
                      <Form.Group>
                        <label>Factor</label>
                        <Form.Control
                          placeholder="Enter Factor"
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Net</label>
                        <Form.Control
                          placeholder="Enter Net"
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="3">
                      <Form.Group>
                        <label>Discount Amount</label>
                        <Form.Control
                          placeholder="Enter Discount Amount"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="2">
                      <Form.Group>
                        <label>Patient Share (%)</label>
                        <Form.Control
                          placeholder="Enter Patient Share"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="1">
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
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Patient Share Amount</label>
                        <Form.Control
                          placeholder="Enter Patient Share Amount"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="3">
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
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Beneficary;
