const express = require('express');
const router = express.Router();
const githubRouter = require('./github');

router.use('/github', githubRouter);
module.exports = router;