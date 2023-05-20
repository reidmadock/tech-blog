const User = require('./User');
const UserPost = require('./UserPost');
const Comment = require('./Comment');

UserPost.belongsTo(User, {
    foreignKey: "user_id"
});

Comment.belongsTo(UserPost, {
    foreignKey: "user_post_id"
});

UserPost.hasMany(Comment, {
    foreignKey: "user_post_id",
    onDelete: "CASCADE"
});

module.exports = { User, UserPost };