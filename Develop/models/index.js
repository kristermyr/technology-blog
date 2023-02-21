const Post = require('./Post');
const User = require('./User');
const Comment = require('./Comment');
// 11-Ins_Partials models
// 18-Stu_Session

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });

User.hasMany(Post, {
    foreignKey: 'user_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
});
  module.exports = { User, Post, Comment};