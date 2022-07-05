//here we export helper to help print error or json data in formate.
module.exports = {
  respondAsJSON: (
    res,
    message = "",
    data = {},
    status = true,
    statusCode = 200
  ) => {
    res.status(statusCode).json({ status, statusCode, message, data });
  },

  handleError: (
    res,
    statusCode = 500,
    message = "Internal server error",
    status = false,
    data = {}
  ) => {
    message = message || "Internal server error";
    res.status(statusCode).send({ status, statusCode, message, data });
    return;
  },
};
