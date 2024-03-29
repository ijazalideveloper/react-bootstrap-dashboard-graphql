import React, { useState } from "react";

// react-bootstrap components
import { Button, Card, Form, Row, Col,Table } from "react-bootstrap";

function Diagnosis() {
  const [inputList, setInputList] = useState([{ firstName: "", lastName: "" }]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { firstName: "", lastName: "" }]);
  };
  return (
    <Row>
      <Col md="12">
        <Card>
          <Card.Header className="d-flex justify-content-between">
            <Card.Title as="h4">Diagnosis</Card.Title>
            {/* {inputList.length - 1 === i && ( */}
            <Button
              className="btn-fill float-right rounded mb-3"
              type="button"
              variant="info"
              onClick={handleAddClick}
            >
              +
            </Button>
            {/* )} */}
          </Card.Header>
          <Table size="sm">
      <thead >
        <tr className="bg-info text-white mx-2">
          <th className="text-white align-center">Code - Description</th>
          <th className="text-white align-center">Type</th>
          <th className="text-white align-center">On Admission</th>

          <th></th>
        </tr>
      </thead>
      </Table>
          <Card.Body>
            <Form>
              {inputList.map((x, i) => {
                return (
                  <>
                    <Row>
                      <Col className="pr-1" md="3">
                        <Form.Group>
                          <Form.Control
                            placeholder="Eligibility Response Identifier"
                            type="text"
                          ></Form.Control>
                        </Form.Group>
                      </Col>

                      <Col className="py-0" md="3">
                        <Form.Group>
                          <Col className="pr-1" md="12">
                            <select
                              className="custom-select"
                              id="gender2"
                              onChange={(e) => handleInputChange(e, i)}
                            >
                              <option selected>Choose...</option>
                              <option value="1">Institution</option>
                              <option value="2">Institution 1</option>
                            </select>
                          </Col>
                        </Form.Group>
                      </Col>
                      <Col className="py-0" md="3">
                        <Form.Group>
                          <Col className="pr-1" md="12">
                            <select className="custom-select" id="gender2">
                              <option selected>Choose...</option>
                              <option value="1">Institution</option>
                              <option value="2">Institution 1</option>
                            </select>
                          </Col>
                        </Form.Group>
                      </Col>
                      <Col className="py-1 d-inline-flex justify-content-end" md="1">
                        {inputList.length !== 1 && (
                          <Button
                            className="btn-fill pull-right"
                            type="button"
                            variant="info"
                            onClick={() => handleRemoveClick(i)}
                          >
                            <i className="nc-icon nc-simple-remove"></i>
                          </Button>
                        )}
                      </Col>
                    </Row>
                    {/* <Row>
                      <Col className="pr-1" md="6">
                        {inputList.length - 1 === i && (
                          <Button
                            className="btn-fill float-right rounded"
                            type="button"
                            variant="info"
                            onClick={handleAddClick}
                          >
                            +
                          </Button>
                        )}
                      </Col>
                    </Row> */}
                  </>
                );
              })}
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default Diagnosis;
