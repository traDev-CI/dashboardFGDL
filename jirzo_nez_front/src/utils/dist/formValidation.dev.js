"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emailValidation = exports.minLengthValidation = void 0;

/* eslint-disable no-unused-vars */
var minLengthValidation = function minLengthValidation(inputData, minLength) {
  var value = inputData.value;
  removeClassErrorSuccess(inputData);

  if (value.length >= minLength) {
    inputData.classList.add("success");
    return true;
  } else {
    inputData.classList.add("error");
    return false;
  }
};

exports.minLengthValidation = minLengthValidation;

var emailValidation = function emailValidation(inputData) {
  var emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  var value = inputData.value;
  removeClassErrorSuccess(inputData);
  var resultValidation = emailValid.test(value);

  if (resultValidation) {
    inputData.classList.add("success");
    return true;
  } else {
    inputData.classList.add("error");
    return false;
  }
};

exports.emailValidation = emailValidation;

var removeClassErrorSuccess = function removeClassErrorSuccess(inputData) {
  inputData.classList.remove("success");
  inputData.classList.remove("error");
};