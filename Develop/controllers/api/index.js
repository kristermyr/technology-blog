const router = require('express').Router();
const userRoutes = require('./userRoutes');
const { User,Post } = require('../../models');


router.use('/users', userRoutes);

module.exports = router;
