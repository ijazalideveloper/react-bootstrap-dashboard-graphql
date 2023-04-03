import React, { useState } from "react";

// react-bootstrap components
import { Link } from "react-router-dom";
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
  Table,
} from "react-bootstrap";

function Beneficaries() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Container fluid>
        <Row>
          <div className="d-flex mb-3" style={{ width: "100%" }}>
            <div className="col">
              <h2 className="mb-0 mt-0">
                <strong>Beneficary</strong>
              </h2>
            </div>
            <div className="col-auto">
              <Button
                variant="primary"
                className="float-right btn btn-fill  btn-primary"
                onClick={handleShow}
              >
                Add Beneficary
              </Button>
              <br />
              <br />
              <input
                className="form-control"
                placeholder="search beneficary"
                classtype="text"
                name="search"
              />
            </div>
          </div>
          <Col md="12">
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
              className="addBeneficaryItemCustomClass"
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
                        <label className="form-check-label">
                          Department / Occupation *
                        </label>
                        <select className="custom-select" id="gender2">
                          <option selected>Choose...</option>
                          <option value="1">Male</option>
                          <option value="2">Female</option>
                        </select>
                      </Form.Group>
                    </Col>
                    <Col className="" md="12">
                      <Form.Group>
                        <label className="form-check-label">Gender *</label>
                        <select className="custom-select" id="gender2">
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
            <div className="box">
              {/* <div className="mb-3 d-flex justify-content-end form-group">
                    <input
                      className="border rounded p-2 col-md-3"
                      type="text"
                      placeholder="Search.."
                    />
                  </div> */}
              <div className="box-body table-responsive strpied-tabled-with-hover card">
                <table className="table-hover table">
                  <tbody>
                    <tr>
                      <th>#</th>
                      <th>Full Name</th>
                      <th>Membership Number</th>
                      <th>TOB Group Number</th>
                      <th>National ID number</th>
                      <th>Department / Occupation </th>
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
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Beneficaries;
