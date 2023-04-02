import React, { useState } from "react";

// react-bootstrap components
import { Button, Card, Form, Row, Col, Table } from "react-bootstrap";

function AttachmentForm() {
  return (
    <div>
      <div className="bg-info d-flex align-items-center">
        <Col className="py-0 text-white py-1" md="1">
          No
        </Col>
        <Col className="py-0 text-white py-1" md="2">
          Category
        </Col>
        <Col className="py-0 text-white py-1" md="2">
          Code
        </Col>
        <Col className="py-0 text-white py-1" md="2">
          Timing
        </Col>
        <Col className="py-0 text-white py-1" md="2">
          Value
        </Col>
        <Col className="py-0 text-white py-1" md="1">
          Attachment
        </Col>
        <Col className="py-0 text-white py-1" md="1">
          Reason
        </Col>
        <Col className="py-0 text-white py-1" md="1"></Col>
      </div>
      <Card.Body>
        <Form>
          <Row className="d-flex align-items-center">
            <Col className="" md="1">
              <div className="input-group">1</div>
            </Col>
            <Col className="" md="2">
              <div className="input-group">Birth Weight</div>
            </Col>
            <Col className="" md="2">
              <div className="">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search this blog"
                />
              </div>
            </Col>
            <Col className="" md="2">
              <input
                type="text"
                className="form-control"
                placeholder="Search this blog"
              />
            </Col>
            <Col className="" md="2">
              <div className="">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search this blog"
                />
              </div>
            </Col>
            <Col className="" md="1"></Col>
            <Col className="" md="1"></Col>
            <Col className="" md="1">
              <Button
                className="btn-fill pull-right"
                type="submit"
                variant="info"
              >
                <i className="nc-icon nc-simple-remove"></i>
              </Button>
            </Col>
          </Row>
          <Row className="d-flex align-items-center">
            <Col className="" md="1">
              <div className="input-group">1</div>
            </Col>
            <Col className="" md="2">
              <div className="input-group">Birth Weight</div>
            </Col>
            <Col className="" md="2">
              <div className="">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search this blog"
                />
              </div>
            </Col>
            <Col className="" md="2">
              <input
                type="text"
                className="form-control"
                placeholder="Search this blog"
              />
            </Col>
            <Col className="" md="2">
              <div className="">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search this blog"
                />
              </div>
            </Col>
            <Col className="" md="1"></Col>
            <Col className="" md="1"></Col>
            <Col className="" md="1">
              <Button
                className="btn-fill pull-right"
                type="submit"
                variant="info"
              >
                <i className="nc-icon nc-simple-remove"></i>
              </Button>
            </Col>
          </Row>
          <Row className="d-flex align-items-center">
            <Col className="" md="1">
              <div className="input-group">1</div>
            </Col>
            <Col className="" md="2">
              <div className="input-group">Birth Weight</div>
            </Col>
            <Col className="" md="2">
              <div className="">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search this blog"
                />
              </div>
            </Col>
            <Col className="" md="2">
              <input
                type="text"
                className="form-control"
                placeholder="Search this blog"
              />
            </Col>
            <Col className="" md="2">
              <div className="">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search this blog"
                />
              </div>
            </Col>
            <Col className="" md="1"></Col>
            <Col className="" md="1"></Col>
            <Col className="" md="1">
              <Button
                className="btn-fill pull-right"
                type="submit"
                variant="info"
              >
                <i className="nc-icon nc-simple-remove"></i>
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </div>
  );
}

export default AttachmentForm;
