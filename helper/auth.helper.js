let helper = require("../helper/common.helper");
const connection = require("../db/db.connection");
const jwt = require("jsonwebtoken");

/**
 * Get authorization token from header
 */
function getAccessTokenFromHeader(req) {
  return req.headers["authorization"] && req.headers["authorization"] !== null
    ? req.headers["authorization"].split(" ")[1]
    : null;
}

module.exports = {
  /**
   * Get Token from Request Header
   */
  getAccessToken: (req) => {
    return getAccessTokenFromHeader(req);
  },

  /*
   * Get employeeData from JWT token.
   */
  //   getEmployeeData: async (req, res, next) => {
  //     try{
  //         let tokenfromheader = getAccessTokenFromHeader(req) ;
  //         console.log(tokenfromheader);
  //         return jwt.verify(tokenfromheader, process.env.JWT_KEY);
  //     }catch(Error){
  //         console.log(Error);
  //     }
  //   },

  ensure: async (req, res, next) => {
    let tokenfromheader = getAccessTokenFromHeader(req);
    // console.log("token from header",tokenfromheader);
    // return false;
    // console.log(req.headers['authorization']);
    if (tokenfromheader === null) {
      helper.handleError(res, 401, "UnAthorize access.", false, {});
    } else {
      let query = "select * from employee where token=?";
      connection.query(query, [tokenfromheader], (err, employeeData) => {
        // console.log("Emp",employeeData);
        if (err) {
          helper.handleError(res, 500, err);
        }
        if (employeeData[0]) {
          next();
        } else {
          helper.handleError(res, 401, "UnAthorize access.", false, {});
        }
      });
    }
  },
};
