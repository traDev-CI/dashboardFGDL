/* eslint-disable no-unused-vars */
const minLengthValidation = (inputData, minLength) => {
  const { value } = inputData;
  removeClassErrorSuccess(inputData);
  if (value.length >= minLength) {
    inputData.classList.add("success");
    return true;
  } else {
    inputData.classList.add("error");
    return false;
  }
};

const emailValidation = (inputData) => {
  const emailValid =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  const { value } = inputData;
  removeClassErrorSuccess(inputData);

  const resultValidation = emailValid.test(value);
  if (resultValidation) {
    inputData.classList.add("success");
    return true;
  } else {
    inputData.classList.add("error");
    return false;
  }
};

const removeClassErrorSuccess = (inputData) => {
  inputData.classList.remove("success");
  inputData.classList.remove("error");
};

export { minLengthValidation, emailValidation };
