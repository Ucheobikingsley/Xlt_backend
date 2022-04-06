const httpStatusCodes = require("./httpStatusCodes");
const BaseError = require("./baseError");

class api400Error extends BaseError {
  constructor(
    name,
    statusCode = httpStatusCodes.NOT_FOUND,
    description,
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}

module.exports = api400Error;
