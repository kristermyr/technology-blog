const Post = require('./Post');
const User = require('./User');

// 11-Ins_Partials models
// 18-Stu_Session

User.hasMany(Post, {
    foreignKey: 'user_id'
  });

Post.belongsTo(User, {
    foreignKey: 'user_id'
  });



  module.exports = { User, Post};