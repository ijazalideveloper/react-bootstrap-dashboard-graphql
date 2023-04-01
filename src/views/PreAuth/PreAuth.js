import React, { useState } from "react";
import { Link } from "react-router-dom";
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

function PreAuth() {

    return (
        <>


            <Container fluid>
                <Row>
                    <Col md="12">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Pre Auth
                                    <Link to="/admin/pre-auth-form" className="btn btn-primary float-right">
                                        <i className="nc-icon nc-simple-add mr-2 font-weight-bold"></i>
                                        Add Pre Auth
                                    </Link>
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
                                                    <th>Batch number </th>
                                                    <th>Provider name </th>
                                                    <th>Provider number </th>
                                                    <th>Billing Month</th>
                                                    <th>Gross amount  </th>
                                                    <th>Net amount   </th>
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

export default PreAuth;
