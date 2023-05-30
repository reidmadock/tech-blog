const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');
const bcrypt = require('bcrypt'); // require bcrypt for hashing passwords

class User extends Model {
    // Adds checkPassword method here for logging in
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            // validate: {
            //     isEmail: true
            // }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8] // Minimum of 8 characters for password
            }
        },
    },
    { // Hashing for when a user signs up and creates their password
        hooks: { 
            async beforeCreate(userData) {
                userData.password = await bcrypt.hash(userData.password, 10); // Difficulty for hashing password set to 10 being extra secure
                return userData;
            }, // Hasing for hashing a updated password
            async beforeUpdate(updatedUserData) {
                if (updatedUserData.password) {
                    updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                }
                return updatedUserData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;
