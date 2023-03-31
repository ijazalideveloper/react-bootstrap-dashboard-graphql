import { useState, useEffect } from "react";

export const SupportingInfoHook = () => {
  const [supportingInfoAttachmentForm, setSupportingInfoAttachmentForm] =
    useState(false);
  const [supportingInfoBirthWeight, setSupportingInfoBirthWeight] =
    useState(false);
  const [supportingInfoCheifCompalint, setSupportingInfoCheifCompalint] =
    useState(false);
  const [supportingInfoDaysSupply, setSupportingInfoDaysSupply] =
    useState(false);
  const [
    supportingInfoEmploymentImpacted,
    setSupportingInfoEmploymentImpacted,
  ] = useState(false);

  const onClicksetSupportingInfoAttachmentForm = () => {
    setSupportingInfoAttachmentForm(!supportingInfoAttachmentForm);
  };

  return {
    supportingInfoAttachmentForm,
    setSupportingInfoAttachmentForm,
    onClicksetSupportingInfoAttachmentForm,
  };
};
