const express = require('express');

const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/passwords', require('./passwords'));
router.use('/profiles', require('./profiles')); // added for profile
router.use('/uploads', require('./uploads'));
router.use('/users', require('./users'));

module.exports = router;
