const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

// User sign-up
exports.userSignup = [
  // validate and sanitize username and password
  body('username')
    .trim()
    .isLength({ min: 4 })
    .withMessage('Username must be at least 4 characters long')
    .isAlphanumeric()
    .withMessage('Username must not contain special characters')
    .escape(),
  body('password')
    .trim()
    .isLength({ min: 4 })
    .withMessage('Password must be at least 4 characters long')
    .escape(),

  async (req, res, next) => {
    try {
      // get errors
      const errors = validationResult(req);

      // return any errors
      if (!errors.isEmpty()) {
        const errorsObj = errors.mapped();
        const validationMsgs = Object.values(errorsObj).map((err) => err.msg);

        res.status(400).json({ error: validationMsgs });
      } else {
        // no errors, continue
        const username = req.body.username;
        const password = req.body.password;

        // see if username exists
        const existingUser = await User.findOne({ username });

        if (existingUser) {
          throw Error('Username already exists');
        }

        // salt and hash password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // create user
        const newUser = await User.create({ username, password: hash });

        // create jwt token
        const jwtToken = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);

        res.status(200).json({ token: jwtToken });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
];

// User login
exports.userLogin = [
  // sanitize inputs
  body('username').trim().escape(),
  body('password').trim().escape(),

  async (req, res, next) => {
    try {
      // no errors, continue
      const username = req.body.username;
      const password = req.body.password;

      // find user
      const existingUser = await User.findOne({ username });

      if (!existingUser) {
        throw Error('Username does not exist');
      }

      // check password
      const isCorrectPassword = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!isCorrectPassword) {
        throw Error('Incorrect password');
      }

      // issue JWT token
      const jwtToken = jwt.sign(
        { _id: existingUser._id },
        process.env.JWT_SECRET
      );

      res.status(200).json({ token: jwtToken });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
];
