export default function validate(values) {
  let errors = {};
  Object.keys(values).forEach(function (key) {
    if (!values[key]) {
      errors[key] = key + " is required";
    }
  });
  return errors;
}
