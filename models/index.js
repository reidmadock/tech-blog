const User = require('./User');
const UserPost = require('./UserPost');
const Comment = require('./Comment');

/* Add user_id foreign key to a UserPost
 Every post has one associated User */
UserPost.belongsTo(User, {
    foreignKey: "user_id"
});

/* Add user_post_id foreign key to a Comment
 Comments become associated to a specific post */
Comment.belongsTo(UserPost, {
    foreignKey: "user_post_id"
});

/* Adds user_post_id foreign key to Comment
 Along with the plural association
 so every post can have multiple comments */
UserPost.hasMany(Comment, {
    foreignKey: "user_post_id",
    onDelete: "CASCADE"
});

/* Add user_id foreign key to Comment
 Every Comment has one associated User */
Comment.belongsTo(User, {
    foreignKey: "user_id"
})

module.exports = { User, UserPost, Comment};