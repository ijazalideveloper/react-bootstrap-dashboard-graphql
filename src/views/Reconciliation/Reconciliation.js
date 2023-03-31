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

function Reconciliation() {

    return (
        <>


            <Container fluid>
                <Row>
                    <Col md="12">

                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Reconciliation</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Table striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Batch number </th>
                                            <th>Provider name </th>
                                            <th>Provider number </th>
                                            <th>Billing Month</th>
                                            <th>Gross amount  </th>
                                            <th>Net amount   </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td>@mdo</td>
                                            <td>@mdo</td>
                                            <td>@mdo</td>
                                        </tr>

                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Reconciliation;
