/*
Get choices field value (the backend returns label)
to pre-populate form choice field
*/
export const getChoiceValue = (choices, status) => {
  const selectedChoice = choices.find((choice) => choice.label === status);
  return selectedChoice ? selectedChoice.value : "";
};
