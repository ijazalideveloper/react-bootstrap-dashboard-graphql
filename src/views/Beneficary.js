import React from "react";

// react-bootstrap components
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
                <Card.Title as="h4">
                  <b>Beneficary Info</b>
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
                        <label class="form-check-label">Referring provider</label>
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
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Beneficary;
