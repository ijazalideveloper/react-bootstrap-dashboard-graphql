import React, { useState } from "react";

// react-bootstrap components
import {
    Card,
    Container,
    Row,
    Col,
    Table,
    Button
} from "react-bootstrap";

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
                                <Card.Title as="h4">Providers 
                                
                                <Button variant="primary" className="float-right" >
                                    Add Provider
                                </Button>
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Table striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Provider name</th>
                                            <th>Provider ID</th>
                                            <th>Contract start</th>
                                            <th>Contract End</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Mark</td>
                                            <td>Otto</td>
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

export default Providers;
