const Joi = require('joi');
const HttpStatus = require('http-status-codes');
const User = require('../models/userModels');
const Helpers = require('../Helpers/helpers');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dbConfig = require('../config/secret');

module.exports = {
  async CreateUser(req, res) {
    const schema = Joi.object().keys({
      username: Joi.string()
        .min(5)
        .max(15)
        .required(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(5)
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required()
    });

    const { error, value } = Joi.validate(req.body, schema);
    console.log(value);
    if (error && error.details) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: error.details
      });
    }
    const userEmail = await User.findOne({
      email: Helpers.lowerCase(req.body.email)
    });
    if (userEmail) {
      return res.status(HttpStatus.CONFLICT).json({
        message: 'Email already exist'
      });
    }
    const userName = await User.findOne({
      username: Helpers.firstUpper(req.body.username)
    });
    if (userName) {
      return res.status(HttpStatus.CONFLICT).json({
        message: 'Username already exist'
      });
    }
    return bcrypt.hash(value.password, 10, (err, hash) => {
      if (err) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Error hashing password'
        });
      }
      const body = {
        username: Helpers.firstUpper(value.username),
        email: Helpers.lowerCase(value.email),
        password: hash
      };
      User.create(body)
        .then(user => {
          const token = jwt.sign({ data: user }, dbConfig.secret, {
            expiresIn: 120
          });
          res.cookie('auth', token);
          res.status(HttpStatus.CREATED).json({
            message: 'User created succesfully',
            user,
            token
          });
        })
        .catch(err => {
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: 'Error occured'
          });
        });
    });
  }
};
