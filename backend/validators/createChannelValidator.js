// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import validator from 'express-validator'
const { check, validationResult } = validator


const validateChannelCreate = [
    check('name')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Channel name can not be empty!')
      .bail()
      .isLength({min: 2})
      .withMessage('Minimum 2 characters required!')
      .bail(),
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
          return res.status(422).json({errors: errors.array()});
        next();
      },
];


export { validateChannelCreate}
