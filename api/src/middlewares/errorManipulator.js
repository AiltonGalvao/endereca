import mongoose from "mongoose";
import BaseError from "../errors/BaseError.js";
import IncorrectRequisition from "../errors/IncorrectRequisiton.js";
import ValidationError from "../errors/ValidationError.js";

// eslint-disable-next-line no-unused-vars
function errorManipulator (error, req, res, next) {
  console.log(error);
  if (error instanceof mongoose.Error.CastError) {
    new IncorrectRequisition().sendResponse(res);
  } else if (error instanceof mongoose.Error.ValidationError) {
    new ValidationError(error).sendResponse(res);
  } else if (error instanceof BaseError) {
    error.sendResponse(res);
  } else {
    new BaseError().sendResponse(res);
  }
}

export default errorManipulator;