import React, { useState } from "react";

// react-bootstrap components
import { Button, Card, Form, Row, Col } from "react-bootstrap";

function CareTeamForm() {
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
          <Card.Header>
            <Card.Title as="h4">Care Team</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form>
              {inputList.map((x, i) => {
                return (
                  <>
                    <Row>
                      <Col className="pr-1" md="3">
                        <div class="input-group">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Search this blog"
                            value={x.firstName}
                            onChange={(e) => handleInputChange(e, i)}
                          />
                          <div class="input-group-append">
                            <button
                              class="btn btn-secondary search_btn_beneficary"
                              type="button"
                            >
                              <i class="fa fa-search"></i>
                            </button>
                          </div>
                        </div>
                      </Col>

                      <Col className="py-0" md="3">
                        <Form.Group>
                          <Col className="pr-1" md="12">
                            <select
                              class="custom-select"
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
                            <select class="custom-select" id="gender2">
                              <option selected>Choose...</option>
                              <option value="1">Institution</option>
                              <option value="2">Institution 1</option>
                            </select>
                          </Col>
                        </Form.Group>
                      </Col>
                      <Col className="py-0" md="2">
                        <Form.Group>
                          <Col className="pr-1" md="12">
                            <select class="custom-select" id="gender2">
                              <option selected>Choose...</option>
                              <option value="1">Institution</option>
                              <option value="2">Institution 1</option>
                            </select>
                          </Col>
                        </Form.Group>
                      </Col>
                      <Col className="py-0" md="1">
                        {inputList.length !== 1 && (
                          <Button
                            className="btn-fill pull-right"
                            type="submit"
                            variant="info"
                            onClick={() => handleRemoveClick(i)}
                          >
                            <i className="nc-icon nc-simple-remove"></i>
                          </Button>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="6">
                        {inputList.length - 1 === i && (
                          <Button
                            className="btn-fill float-right rounded"
                            type="submit"
                            variant="info"
                            onClick={handleAddClick}
                          >
                            +
                          </Button>
                        )}
                      </Col>
                    </Row>
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

export default CareTeamForm;
