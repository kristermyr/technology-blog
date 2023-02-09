const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const { User,Post } = require('../../models');


router.use('/users', userRoutes);
router.use('/posts', postRoutes);


module.exports = router;
