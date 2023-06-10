const db = require('../Models/testModels');
const testController = {};

testController.getItem = async (req, res, next) => {
  try {
    const query = 'select * from people limit 10';

    await db.query(query, (err, results) => {
      if (err) {
        next(err);
      }

      res.locals.people = results.rows;

      return next();
    });
  } catch (err) {
    return next({
      log: 'An error occurred in the testController.js file. Get request failed.',
      message: { err: err },
    });
  }
};

module.exports = testController;
