import React, { useState } from "react";

// react-bootstrap components
import { Link } from "react-router-dom";
import { Card, Container, Col, Tabs, Tab } from "react-bootstrap";

function Claims() {
    return (
        <>
            <Container fluid>
                <Col md="12">
                    <div className="d-flex">
                        <div className="col">
                            <h2 className="mb-0 mt-0">
                                <strong>Claims Transaction</strong>
                            </h2>
                        </div>

                    </div>
                    <Tabs
                        defaultActiveKey="processed"
                        transition={false}
                        id="noanim-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="processed" title="Processed">
                            <div>
                                <div className="box">
                                   
                                    <div className="box-body table-responsive strpied-tabled-with-hover card">
                                        <table className="table-hover table">
                                            <tbody>
                                                <tr>

                                                    <th>Beneficary Name</th>
                                                    <th>Pre Auth Ref No</th>
                                                    <th>Claim ID</th>
                                                    <th>Transaction Date</th>
                                                    <th>Payer</th>
                                                    <th>Status</th>
                                                    <th>Actions</th>
                                                </tr>
                                                <tr>
                                                    <td>Wajnit Zakria Abdulfatah Mahbob(1002649588) </td>
                                                    <td>-</td>
                                                    <td>
                                                        8228918
                                                    </td>
                                                    <td>
                                                        <span className="badge bg-red">24-07-2023</span>
                                                    </td>
                                                    <td>
                                                        Bupa Arabia for Cooperative Insurance
                                                    </td>
                                                    <td>Rejected</td>
                                                    <td>
                                                        <ul class="list-inline m-0">
                                                            <li class="list-inline-item">
                                                                <button class="btn btn-primary btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Add"><i class="fa fa-table"></i></button>
                                                            </li>
                                                            <li class="list-inline-item">
                                                                <button class="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit"><i class="fa fa-edit"></i></button>
                                                            </li>
                                                            <li class="list-inline-item">
                                                                <button class="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i></button>
                                                            </li>
                                                        </ul>
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
                            </div>
                        </Tab>
                        <Tab eventKey="communication_request" title="Communication Request">
                            AAAA
                        </Tab>

                    </Tabs>

                </Col>
            </Container>
        </>
    );
}

export default Claims;
