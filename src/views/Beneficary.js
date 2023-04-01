import React from "react";

// react-bootstrap components
import CareTeamForm from "../components/Beneficary/CareTeam";
import Accident from "components/Beneficary/Accident";
import { BeneficaryHook } from "../hooks/BeneficaryHook/BenaficaryHook";
import Diagnosis from "../components/Beneficary/Diagnosis";
import AddItemForm from "../components/Beneficary/AddItemForm";
import SupportingInfo from "components/Beneficary/SupportingInfo";
import AttachmentForm from "../components/Beneficary/AttachmentForm";
import PreAuthorizationForm from '../components/Beneficary/PreAuthorizationForm';
import {
  Badge,
  Button,
  Card,
  Form,
  Select,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";

const Beneficary = () => {
  const { createNewBeneficaryField, onClickInsurancePlanFieldAdd } =
    BeneficaryHook();
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title
                  as="h4"
                  className="d-flex justify-content-between align-items-center"
                >
                  <b>Beneficary Info</b>
                  <div className="custom-control custom-switch d-inline-flex justify-content-end align-items-center">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customSwitch1"
                    />
                    <label
                      className="custom-control-label mb-0"
                      for="customSwitch1"
                    >
                      Referral
                    </label>
                  </div>
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <div class="form-check d-flex justify-content-start align-items-center">
                          <input
                            style={{ marginTop: "-1px" }}
                            class="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                          />
                          <label
                            style={{ paddingLeft: "4px" }}
                            class="form-check-label"
                            for="flexRadioDefault1"
                          >
                            {" "}
                            New Born{" "}
                          </label>
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="justify-content-between">
                    <Col className="pr-1" md="5">
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Search this blog"
                        />
                        <div class="input-group-append">
                          <button
                            class="btn btn-secondary search_btn_beneficary border bg-light"
                            type="button"
                          >
                            <i class="fa fa-search"></i>
                          </button>
                        </div>
                      </div>
                    </Col>
                    <Col
                      className="pr-1 d-flex justify-content-start align-items-center"
                      md="2"
                    >
                      <label
                        style={{ paddingLeft: "4px" }}
                        class="form-check-label"
                        for="flexRadioDefault1"
                      >
                        {" "}
                        OR{" "}
                      </label>
                    </Col>
                    <Col className="pr-1" md="5">
                      <Button
                        className="btn-fill float-right mr-4"
                        type="button"
                        variant="info"
                        onClick={onClickInsurancePlanFieldAdd}
                      >
                        Create New Beneficary
                      </Button>
                    </Col>
                  </Row>
                  {createNewBeneficaryField && (
                    <Row>
                      <Col className="pr-1" md="5">
                        <Form.Group>
                          <label class="form-check-label">
                            Insurance Plans
                          </label>
                          <Col className="pr-1" md="12">
                            <select class="custom-select" id="gender2">
                              <option selected>Choose...</option>
                              <option value="1">Male</option>
                              <option value="2">Female</option>
                            </select>
                          </Col>
                        </Form.Group>
                      </Col>
                    </Row>
                  )}
                </Form>
              </Card.Body>
            </Card>

            <PreAuthorizationForm />

            <CareTeamForm />

            <Diagnosis />

            <Accident></Accident>

            <SupportingInfo></SupportingInfo>

            <AddItemForm />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Beneficary;
