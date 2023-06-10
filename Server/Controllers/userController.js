const bcrypt = require('bcrypt');
const db = require('../Models/testModels');
const userController = {};
const workFactor = 10;

// get the hash value for 1234,

/* controller for verifying user login */
userController.verifyUser = async (req, res, next) => {
  // deconstruct the req body to get user and password
  const { username, password } = req.body;

  const query = 'select password from userlogin where username = Michael';

  bcrypt
    .hash(password, workFactor)
    .then((hash) => {
      return next();
    })
    .catch((err) => console.log(err));
};

module.exports = userController;
