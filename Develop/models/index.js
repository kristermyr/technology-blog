const Post = require('./Post');
const User = require('./User');

// 11-Ins_Partials models
// 18-Stu_Session

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });



  module.exports = { User, Post};