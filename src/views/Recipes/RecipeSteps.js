import React, { useState, useEffect } from "react";
import services from "services";
import { useToast } from "components/Toast";

export default function RecipeSteps(props) {
  const { steps, setFieldValue } = props;

  const toast = useToast();

  const [step, setStep] = useState();

  const saveIngredient = () => {
    if (!step) {
      toast.add(
        "tr",
        "danger",

        "Add Step First"
      );
      return;
    }
    let allSteps = steps ? steps : [];

    allSteps = [...allSteps, step];

    setFieldValue("steps", allSteps);
    setStep("");
  };
  const handleDelete = (index) => {
    let splicedSteps = steps.filter((item, i) => i !== index);

    setFieldValue("steps", splicedSteps);
  };
  return (
    <>
      <div className=" ingredients-form-control d-flex">
        <input
          placeholder="Add Steps"
          className="step"
          name="step"
          type="text"
          onChange={(e) => setStep(e.target.value)}
          value={step}
        />

        <span onClick={saveIngredient} className="btn btn-success ">
          Add Step
        </span>
      </div>

      {steps?.map((step, i) => (
        <div className="recipe-tag-item mt-2" key={i}>
          <span className="step"> {step}</span>
          <span type="span" className="button" onClick={() => handleDelete(i)}>
            &times;
          </span>
        </div>
      ))}
    </>
  );
}
