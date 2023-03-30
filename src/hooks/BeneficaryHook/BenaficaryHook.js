import { useState, useEffect } from "react";

export const BeneficaryHook = () => {
  const [createNewBeneficaryField, setCreateNewBeneficaryField] =
    useState(false);

  const onClickInsurancePlanFieldAdd = () => {
    setCreateNewBeneficaryField(!createNewBeneficaryField);
  };

  return {
    createNewBeneficaryField,
    setCreateNewBeneficaryField,
    onClickInsurancePlanFieldAdd,
  };
};
