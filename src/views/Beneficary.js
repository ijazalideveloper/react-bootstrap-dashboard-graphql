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
                <Card.Title as="h4">Beneficary Info</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        {["radio"].map((type) => (
                          <div key={`default-${type}`} className="mb-3">
                            <Form.Check
                              type={type}
                              id={`default-${type}`}
                              label={`default ${type}`}
                            />
                          </div>
                        ))}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Card.Title as="h4">Select a Beneficary</Card.Title>
                  <Row className="justify-content-between">
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Username</label>
                        <Form.Control
                          defaultValue="michael23"
                          placeholder="Username"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Button
                    className="btn-fill float-right mr-4"
                    type="submit"
                    variant="info"
                  >
                    Create New Beneficary
                  </Button>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        {["radio"].map((type) => (
                          <div key={`default-${type}`} className="mb-3">
                            <Form.Check
                              type={type}
                              id={`default-${type}`}
                              label={`default ${type}`}
                            />
                          </div>
                        ))}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                  <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Insurance Plans</label>
                        <Form.Select aria-label="Default select example">
                          <option>Open this select menu</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </Form.Select>
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
                        <label>Type</label>
                        <Form.Control
                
                          placeholder="Type"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Sub Type</label>
                        <Form.Control
                
                          placeholder="Type"
                          type="text"
                        ></Form.Control>
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
                        <label>Payee Type</label>
                        <Form.Control
                
                          placeholder="Eligibility Response Identifier(URL)"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Payee</label>
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
                        <label>Related Preauthorization Refernce No(s)</label>
                        <Form.Control
                        
                          placeholder="Related Preauthorization Refernce No(s"
                          type="date"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Referring provider</label>
                        <Form.Control
                
                          placeholder="Referring provider"
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
