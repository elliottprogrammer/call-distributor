const express = require('express');
const router = express.Router();

// @route   GET /api/reaches/test
// @desc    Tests reaches route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "Reaches Works"}));

module.exports = router;