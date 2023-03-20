import React, { useState, useEffect } from "react";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import services from "services";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useToast } from "components/Toast";
import Loader from "components/Loader";
import { Formik, Form, Field, ErrorMessage } from "formik";
function Shift(props) {
  const { recipes, spliceShift, addShift } = props;
  const [recipeOption, setRecipeOption] = useState([]);

  const [shift, setShift] = useState(props.shift);
  const toast = useToast();
  const animatedComponents = makeAnimated();

  const updateShift = (id) => {
    if (!recipeOption.length) {
      toast.add("tr", "danger", "Add Shift Recipe");
      return;
    }

    shift.recipes = recipeOption;
    addShift(shift);
  };
  return (
    <Row className="align-items-center">
      <Col>
        <label htmlFor="">Name</label>
        <Field
          name="name"
          className="form-control"
          type="text"
          value={shift.name}
          readOnly
        />
      </Col>
      <Col>
        <label htmlFor="">Selected Recipe</label>

        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          defaultValue={shift.recipes}
          placeholder="Select Recipe(s) for this shift"
          options={recipes}
          onChange={(selectedOption) => {
            setRecipeOption(selectedOption);
          }}
        />
      </Col>
      <div className="col-auto mt-3">
        {/* <button
          className="btn btn-light mr-2  "
          type="button"
          onClick={() => spliceShift(shift.id)}
        >
          Delete
        </button> */}
        <button
          className="btn btn-success mr-2  btn-fill"
          onClick={() => updateShift(shift.id)}
          type="button"
        >
          {shift.recipes ? "Update" : "Save"}
        </button>
      </div>
    </Row>
  );
}

export default Shift;
