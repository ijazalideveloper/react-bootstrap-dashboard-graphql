import React from "react";
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function AddProvider() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Button
                  className="btn-fill float-left"
                  type="submit"
                  variant="info"
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
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="" md="6">
                      <Form.Group>
                        <label>Provider Number</label>
                        <Form.Control
                          placeholder="Provider123"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="" md="6">
                      <Form.Group>
                        <label htmlFor="providername">Provider Name</label>
                        <Form.Control
                          placeholder="Provider Name"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="" md="6">
                      <Form.Group>
                        <label>Start Date</label>
                        <Form.Control
                          placeholder="startdate"
                          type="date"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="" md="6">
                      <Form.Group>
                        <label>End Date</label>
                        <Form.Control
                          placeholder="End Date"
                          type="date"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="" md="3">
                      <Form.Group>
                        <label>Provider Address</label>
                        <Form.Control
                          placeholder="Provider Address"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="" md="3">
                      <Form.Group>
                        <label>Provider Bank Account</label>
                        <Form.Control
                          placeholder="Provider Bank Account"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="" md="3">
                      <Form.Group>
                        <label>Provider Vat Number</label>
                        <Form.Control
                          placeholder="Provider Vat Number"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="" md="3">
                      <Form.Group>
                        <label>Provider CR Number</label>
                        <Form.Control
                          placeholder="Provider CR Number"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="" md="3">
                      <Form.Group>
                        <label>Provider CR Holder Name</label>
                        <Form.Control
                          placeholder="Provider CR Holder Name"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="" md="3">
                      <Form.Group>
                        <label>Provider Email</label>
                        <Form.Control
                          placeholder="Provider Email"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="" md="3">
                      <Form.Group>
                        <label>Provider Mobile</label>
                        <Form.Control
                          placeholder="Provider Mobile"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="" md="3">
                      <Form.Group>
                        <label>Provider ID</label>
                        <Form.Control
                          placeholder="Provider ID"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="" md="3">
                      <Form.Group>
                        <label>CEO Name</label>
                        <Form.Control
                          placeholder="CEO Name"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="" md="3">
                      <Form.Group>
                        <label>ID Number</label>
                        <Form.Control
                          placeholder="ID Number"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="" md="3">
                      <Form.Group>
                        <label>Email Address</label>
                        <Form.Control
                          placeholder="Email Address"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="" md="3">
                      <Form.Group>
                        <label>Mobile Number</label>
                        <Form.Control
                          placeholder="Mobile Number"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="" md="3">
                      <Form.Group>
                        <label>CEO Name</label>
                        <Form.Control
                          placeholder="CEO Name"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="" md="3">
                      <Form.Group>
                        <label>ID Number</label>
                        <Form.Control
                          placeholder="ID Number"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="" md="3">
                      <Form.Group>
                        <label>Email Address</label>
                        <Form.Control
                          placeholder="Email Address"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="" md="3">
                      <Form.Group>
                        <label>Mobile Number</label>
                        <Form.Control
                          placeholder="Mobile Number"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="" md="3">
                      <Form.Group>
                        <label>Account Manager Name</label>
                        <Form.Control
                          placeholder="Account Manager Name"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="" md="3">
                      <Form.Group>
                        <label>Account ID Number</label>
                        <Form.Control
                          placeholder="Account ID Number"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="" md="3">
                      <Form.Group>
                        <label>Account Email Address</label>
                        <Form.Control
                          placeholder="Account Email Address"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="" md="3">
                      <Form.Group>
                        <label>Account Mobile Number</label>
                        <Form.Control
                          placeholder="Account Mobile Number"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="" md="4">
                      <Form.Group>
                        <label>Provider telephone number</label>
                        <Form.Control
                          placeholder="Provider telephone number"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="" md="4">
                      <Form.Group>
                        <label>Provider email address</label>
                        <Form.Control
                          placeholder="Provider email address"
                          type="email"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="" md="4">
                      <Form.Group>
                        <label>Provider Fax number</label>
                        <Form.Control
                          placeholder="Provider Fax number"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="success"
                  >
                    Add
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AddProvider;
