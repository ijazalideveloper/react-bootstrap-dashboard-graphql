import React, { useState } from "react";

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
    Modal,
    Table
} from "react-bootstrap";

function Beneficaries() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>


            <Container fluid>
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
                            size="md"
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Add Beneficary</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Row>

                                        <Col className="" md="12">
                                            <Form.Group>
                                                <label>Full Name</label>
                                                <Form.Control
                                                    placeholder="Full Name"
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="" md="12">
                                            <Form.Group>
                                                <label>Membership Number</label>
                                                <Form.Control
                                                    placeholder="Membership Number"
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="" md="12">
                                            <Form.Group>
                                                <label>TOB Group Number</label>
                                                <Form.Control
                                                    placeholder="TOB Group Number"
                                                    type="number"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="" md="12">
                                            <Form.Group>
                                                <label>Date Of Birth</label>
                                                <Form.Control
                                                    placeholder="Date Of Birth"
                                                    type="date"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="" md="12">
                                            <Form.Group>
                                                <label>National ID number</label>
                                                <Form.Control
                                                    placeholder="National ID number"
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="" md="12">
                                            <Form.Group>


                                                <label class="form-check-label">Department / Occupation  *</label>
                                                <select class="custom-select" id="gender2">
                                                    <option selected>Choose...</option>
                                                    <option value="1">Male</option>
                                                    <option value="2">Female</option>
                                                </select>

                                            </Form.Group>
                                        </Col>
                                        <Col className="" md="12">
                                            <Form.Group>
                                                <label class="form-check-label">Gender  *</label>
                                                <select class="custom-select" id="gender2">
                                                    <option selected>Choose...</option>
                                                    <option value="1">Male</option>
                                                    <option value="2">Female</option>
                                                </select>
                                            </Form.Group>
                                        </Col>
                                        <Col className="" md="12">
                                            <Form.Group>
                                                <label>Mobile Number *</label>
                                                <Form.Control
                                                    placeholder="Mobile Number "
                                                    type="text"
                                                ></Form.Control>
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
                                <Button variant="primary">Add</Button>
                            </Modal.Footer>
                        </Modal>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Beneficary Lists<Button variant="primary" className="float-right" onClick={handleShow}>
                                    Add Beneficary
                                </Button></Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <div class="box">
                                    <div className="mb-3 d-flex justify-content-end form-group">
                                        <input
                                            className="border rounded p-2 col-md-3"
                                            type="text"
                                            placeholder="Search.."
                                        />
                                    </div>
                                    <div class="box-body table-responsive">
                                        <table class="table table-bordered table-striped table-hover">
                                            <tbody>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Full Name</th>
                                                    <th>Membership Number</th>
                                                    <th>TOB Group Number</th>
                                                    <th>National ID number</th>
                                                    <th>Department / Occupation  </th>

                                                </tr>

                                                <tr>
                                                    <td>1.</td>
                                                    <td>Install New Software</td>
                                                    <td>
                                                        <div class="progress progress-xs">
                                                            <div class="progress-bar progress-bar-danger"></div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span class="badge bg-red">55%</span>
                                                    </td>
                                                    <td>
                                                        <span class="badge bg-red">55%</span>
                                                    </td>
                                                    <td>
                                                        <span class="badge bg-red">55%</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>1.</td>
                                                    <td>Install New Software</td>
                                                    <td>
                                                        <div class="progress progress-xs">
                                                            <div class="progress-bar progress-bar-danger"></div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span class="badge bg-red">55%</span>
                                                    </td>
                                                    <td>
                                                        <span class="badge bg-red">55%</span>
                                                    </td>
                                                    <td>
                                                        <span class="badge bg-red">55%</span>
                                                    </td>
                                                </tr><tr>
                                                    <td>1.</td>
                                                    <td>Install New Software</td>
                                                    <td>
                                                        <div class="progress progress-xs">
                                                            <div class="progress-bar progress-bar-danger"></div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span class="badge bg-red">55%</span>
                                                    </td>
                                                    <td>
                                                        <span class="badge bg-red">55%</span>
                                                    </td>
                                                    <td>
                                                        <span class="badge bg-red">55%</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>1.</td>
                                                    <td>Install New Software</td>
                                                    <td>
                                                        <div class="progress progress-xs">
                                                            <div class="progress-bar progress-bar-danger"></div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span class="badge bg-red">55%</span>
                                                    </td>
                                                    <td>
                                                        <span class="badge bg-red">55%</span>
                                                    </td>
                                                    <td>
                                                        <span class="badge bg-red">55%</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="box-footer clearfix">
                                        <ul class="pagination d-flex justify-content-end">
                                            <li class="page-item">
                                                <a class="page-link" href="#">
                                                    Previous
                                                </a>
                                            </li>
                                            <li class="page-item">
                                                <a class="page-link" href="#">
                                                    1
                                                </a>
                                            </li>
                                            <li class="page-item active">
                                                <a class="page-link" href="#">
                                                    2
                                                </a>
                                            </li>
                                            <li class="page-item">
                                                <a class="page-link" href="#">
                                                    3
                                                </a>
                                            </li>
                                            <li class="page-item">
                                                <a class="page-link" href="#">
                                                    Next
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>

                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Beneficaries;
