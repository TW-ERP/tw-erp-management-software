const express = require('express');
const router = express.Router();
const testController = require('../Controllers/testController');

router.get('/', testController.getItem, (req, res) => {
  return res.status(200).json(res.locals.people);
});

module.exports = router;
