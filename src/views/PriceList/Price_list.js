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

function PriceList() {
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
                                <Modal.Title>Add Price List</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Row>

                                        <Col className="pr-1" md="12">
                                            <Form.Group>

                                                <Col className="pr-1" md="12">
                                                    <label className="form-check-label">Type*</label>
                                                    <select className="custom-select" id="gender2">
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
                                                    <label className="form-check-label">Service Code*</label>
                                                    <select className="custom-select" id="gender2">
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
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Price List <Button variant="primary" className="float-right" onClick={handleShow}>
                                    Add Price List
                                </Button></Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <div className="box">
                                    <div className="mb-3 d-flex justify-content-end form-group">
                                        <input
                                            className="border rounded p-2 col-md-3"
                                            type="text"
                                            placeholder="Search.."
                                        />
                                    </div>
                                    <div className="box-body table-responsive">
                                        <table className="table table-bordered table-striped table-hover">
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
                                                        <div className="progress progress-xs">
                                                            <div className="progress-bar progress-bar-danger"></div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className="badge bg-red">55%</span>
                                                    </td>
                                                    <td>
                                                        <span className="badge bg-red">55%</span>
                                                    </td>
                                                    <td>
                                                        <span className="badge bg-red">55%</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>1.</td>
                                                    <td>Install New Software</td>
                                                    <td>
                                                        <div className="progress progress-xs">
                                                            <div className="progress-bar progress-bar-danger"></div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className="badge bg-red">55%</span>
                                                    </td>
                                                    <td>
                                                        <span className="badge bg-red">55%</span>
                                                    </td>
                                                    <td>
                                                        <span className="badge bg-red">55%</span>
                                                    </td>
                                                </tr><tr>
                                                    <td>1.</td>
                                                    <td>Install New Software</td>
                                                    <td>
                                                        <div className="progress progress-xs">
                                                            <div className="progress-bar progress-bar-danger"></div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className="badge bg-red">55%</span>
                                                    </td>
                                                    <td>
                                                        <span className="badge bg-red">55%</span>
                                                    </td>
                                                    <td>
                                                        <span className="badge bg-red">55%</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>1.</td>
                                                    <td>Install New Software</td>
                                                    <td>
                                                        <div className="progress progress-xs">
                                                            <div className="progress-bar progress-bar-danger"></div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className="badge bg-red">55%</span>
                                                    </td>
                                                    <td>
                                                        <span className="badge bg-red">55%</span>
                                                    </td>
                                                    <td>
                                                        <span className="badge bg-red">55%</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="box-footer clearfix">
                                        <ul className="pagination d-flex justify-content-end">
                                            <li className="page-item">
                                                <a className="page-link" href="#">
                                                    Previous
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="#">
                                                    1
                                                </a>
                                            </li>
                                            <li className="page-item active">
                                                <a className="page-link" href="#">
                                                    2
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="#">
                                                    3
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="#">
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

export default PriceList;
