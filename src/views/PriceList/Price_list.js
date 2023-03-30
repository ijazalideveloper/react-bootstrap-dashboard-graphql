import React , { useState }from "react";

// react-bootstrap components
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
  Modal
} from "react-bootstrap";

function PriceList() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <>
    <Button variant="primary" onClick={handleShow}>
       Add Price List
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Price List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
                  <Row>
                    
                  <Col className="pr-1" md="12">
                      <Form.Group>
                        
                        <Col className="pr-1" md="12">
                        <label class="form-check-label">Type*</label>
                          <select class="custom-select" id="gender2">
                            <option selected>Choose...</option>
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                          </select>
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="12">
                      <Form.Group>
                       
                        <Col className="pr-1" md="12">
                        <label class="form-check-label">Service Code*</label>
                          <select class="custom-select" id="gender2">
                            <option selected>Choose...</option>
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                          </select>
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="12">
                      <Form.Group>
                       
                        <Col className="pr-1" md="12">
                        <label>Non Standard Code *</label>
                        <Form.Control
                          placeholder="Non Standard Code"
                          type="text"
                        ></Form.Control>
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="12">
                      <Form.Group>

                        <Col className="pr-1" md="12">
                        <label>Non Standard Description*</label>
                        <Form.Control
                          placeholder="Non Standard Description"
                          type="text"
                        ></Form.Control>
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                      <Col className="pr-1" md="12">
                        <label>Unit Price*</label>
                        <Form.Control
                          placeholder="Unit Price"
                          type="text"
                        ></Form.Control>
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="12">
                      <Form.Group>
                      <Col className="pr-1" md="12">
                        <label>Factor*</label>
                        <Form.Control
                          placeholder="Enter Factor"
                          type="text"
                        ></Form.Control>
                        </Col>
                      </Form.Group>
                    </Col>
                    
                  </Row>
                
                
                  <div className="clearfix"></div>
                </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
      
    </>
  );
}

export default PriceList;
