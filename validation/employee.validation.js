const { body } = require("express-validator/check");
//here we export a validate method.
exports.validate = (method) => {
  switch (method) {
    case "searchEmployee": {
      return [
        body("name")
          .isLength({ min: 3 }, { min: 150 })
          .trim()
          .escape()
          .withMessage("Name is required filed."),
        body("email", "Invalid email").isEmail().normalizeEmail(),
        body("contact_no")
          .isNumeric()
          .isLength({ max: 10, min: 10 })
          .withMessage("Enter Mobile Number with 10 Digit."),
      ];
    }
    //here we validate a update employee field.
    case "updateEmployee": {
      return [
        body("name")
          .isLength({ min: 3 }, { max: 50 })
          .trim()
          .escape()
          .withMessage("Name is required filed."),
        body("email", "Invalid email").isEmail().normalizeEmail(),
        body("contact_no")
          .isNumeric()
          .isLength({ max: 10, min: 10 })
          .withMessage("Enter Mobile Number with 10 Digit."),
        body("is_status")
          .isIn(["Pending", "Active", "InActive"])
          .withMessage("Only Pending, Active & InActive status accepted."),
      ];
    }
    //here we validate a registration field.
    case "registration": {
      return [
        body("name")
          .isLength({ min: 3 }, { max: 50 })
          .trim()
          .escape()
          .withMessage("Name is required filed."),
        body("email").isEmail().normalizeEmail().withMessage("Invalid email"),
        body("password")
          .isLength({ max: 8 })
          .trim()
          .withMessage("Enter Password with 8 character"),
        body("contact_no")
          .isNumeric()
          .isLength({ max: 10, min: 10 })
          .withMessage("Enter Mobile Number with 10 Digit."),
        body("is_status")
          .isIn(["Pending", "Active", "InActive"])
          .withMessage("Only Pending, Active & InActive status accepted."),
      ];
    }
    //here we validate a login field.
    case "login": {
      return [
        body("email").isEmail().normalizeEmail().withMessage("Invalid email"),
        body("password")
          .isLength({ max: 8 })
          .trim()
          .withMessage("Enter Password with 8 character"),
      ];
    }
  }
};
