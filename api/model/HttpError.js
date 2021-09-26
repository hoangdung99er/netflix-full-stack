class HttpError extends Error {
  constructor(errorMessage, errorCode) {
    super();
    this.message = errorMessage;
    this.code = errorCode;
  }
}

module.exports = HttpError
