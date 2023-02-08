const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const { User,Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
module.exports = router;
