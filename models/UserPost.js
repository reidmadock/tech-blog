const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserPost extends Model {}

UserPost.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
    },
    {
        sequelize,
        timestamps: true, // Should I be using timestamps true? Or just add a data field...
        updatedAt: false, // Not sure if I do or don't need this or if causing probem with comment table
        createdAt: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'user_post'
    }
);

module.exports = UserPost;
