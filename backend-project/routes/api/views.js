const express = require('express');
const router = express.Router();

// Load data model
const Item = require('../../models/Item');

// @route GET api/views/test
// @description tests views route
// @access Public
router.get('/test', (req, res) => res.send('book route testing!'));

module.exports = router;
