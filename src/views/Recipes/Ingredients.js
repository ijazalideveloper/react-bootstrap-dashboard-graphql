import React, { useState, useEffect } from "react";
import services from "services";
import { useToast } from "components/Toast";

export default function Ingredients(props) {
  const { ingredients, setFieldValue } = props;

  const toast = useToast();

  const [quantity, setQuantity] = useState();

  const [name, setName] = useState();

  const saveIngredient = () => {
    if (!quantity || !name) {
      toast.add(
        "tr",
        "danger",

        "Add recipe quantity and name first"
      );
      return;
    }
    let newIngredient = {
      name: name,
      quantity: quantity,
    };
    let allIngredients = ingredients ? ingredients : [];

    allIngredients = [...allIngredients, newIngredient];
    console.log(allIngredients);
    setFieldValue("ingredients", allIngredients);
    setQuantity("");
    setName("");
  };

  const handleDelete = (index) => {
    let splicedIngredients = ingredients.filter((item, i) => i !== index);

    setFieldValue("ingredients", splicedIngredients);
  };
  return (
    <>
      <div className=" ingredients-form-control d-flex">
        <input
          placeholder="Quantity"
          name="quantity"
          className="quantity"
          type="text"
          onChange={(e) => setQuantity(e.target.value)}
          value={quantity}
        />
        <input
          placeholder="Name"
          name="ingredient"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span onClick={saveIngredient} className="btn btn-success btn-wd">
          Add Ingredient
        </span>
      </div>
      {ingredients?.map((item, i) => (
        <div className="recipe-tag-item mt-2" key={i}>
          <span className="step">
            <b style={{ color: "#253b02" }}>{item.quantity}:</b> {item.name}
          </span>
          <span
            type="button"
            className="button"
            onClick={() => handleDelete(i)}
          >
            &times;
          </span>
        </div>
      ))}
    </>
  );
}
