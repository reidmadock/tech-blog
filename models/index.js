const User = require('./User');
const UserPost = require('./UserPost');

UserPost.belongsTo(User, {
    foreignKey: "user_id"
});

module.exports = { User, UserPost };