import React, { useState } from "react";

// react-bootstrap components
import { Card, Container, Row, Col, Table, Button } from "react-bootstrap";

function Providers() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">
                  Providers
                  <Button variant="primary" className="float-right">
                    Add Provider
                  </Button>
                </Card.Title>
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
                          <th>Work</th>
                          <th>Progress</th>
                          <th>Label</th>
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
                        </tr>
                        <tr>
                          <td>2.</td>
                          <td>Upload new SQL file</td>
                          <td>
                            <div class="progress progress-xs">
                              <div class="progress-bar progress-bar-yellow"></div>
                            </div>
                          </td>
                          <td>
                            <span class="badge bg-yellow">70%</span>
                          </td>
                        </tr>
                        <tr>
                          <td>3.</td>
                          <td>Cron job running</td>
                          <td>
                            <div class="progress progress-xs progress-striped active">
                              <div class="progress-bar progress-bar-primary"></div>
                            </div>
                          </td>
                          <td>
                            <span class="badge bg-light-blue">30%</span>
                          </td>
                        </tr>
                        <tr>
                          <td>4.</td>
                          <td>Fix and remove bugs</td>
                          <td>
                            <div class="progress progress-xs progress-striped active">
                              <div class="progress-bar progress-bar-success"></div>
                            </div>
                          </td>
                          <td>
                            <span class="badge bg-green">90%</span>
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

export default Providers;
