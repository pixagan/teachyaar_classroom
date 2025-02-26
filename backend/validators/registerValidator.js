// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import validator from 'express-validator'
const { check, validationResult } = validator



const validateUserRegister = [
    check('name')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('User name can not be empty!')
      .bail()
      .isLength({min: 2})
      .withMessage('Minimum 2 characters required!')
      .bail(),
    check('email')
      .trim()
      .normalizeEmail()
      .not()
      .isEmpty()
      .withMessage('Invalid email address!')
      .bail(),
    check('phoneNo')
      .trim()
      .not()
      .isEmpty()
      .bail()
      .isLength(10)
      .isNumeric()
      .withMessage('Invalid phone no!')
      .bail(),
    // check('password')
    //   .trim()
    //   .escape()
    //   .not()
    //   .isEmpty()
    //   .withMessage('password can not be empty!')
    //   .bail()
    //   .isLength({min: 6})
    //   .withMessage('Minimum 6 characters required!')
    //   .bail(),
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
          return res.status(422).json({errors: errors.array()});
        next();
      },
];


export { validateUserRegister}
//export { userValidationResult,  validateUserRegister}
 