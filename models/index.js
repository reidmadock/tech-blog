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

// User.belongsToMany(comment)

Comment.belongsTo(User, {
    foreignKey: "user_id"
})

// Comment.belongsToMany(User, { through: UserPost });

module.exports = { User, UserPost, Comment};