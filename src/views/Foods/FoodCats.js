import React, { useState, useEffect } from "react";
import services from "services";
import { useToast } from "components/Toast";

const FoodCats = props => {
  const toast = useToast();
  const { foodId, cats, setFieldValue } = props;
  const handleDelete = index => {
    try {
      const splicedSteps = cats.filter((item, i) => i !== index);
    let delFood = {
      category: cats[index].id,
      foods: [foodId],
      action: "remove",
    };
    cats.length < 2
      ? toast.add("tr", "danger", "Atleast One Category Is Required")
      : services.FoodCategoriesService.addRemoveFoods(delFood);
    setFieldValue("foodCategories", splicedSteps);
    } catch (err) {
      toast.add(
        "tr",
        "danger",
        err.message || err?.response?.data?.code || "Something went wrong"
      );
    }
  };

  return (
    <>
      {cats?.map((step, i) => (
        <div className="recipe-tag-item mt-2" key={i}>
          <span className="step"> {step.title}</span>
          <span type="span" className="button" onClick={() => handleDelete(i)}>
            &times;
          </span>
        </div>
      ))}
    </>
  );
};

export default FoodCats;
