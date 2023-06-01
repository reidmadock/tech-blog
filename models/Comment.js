const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
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
        user_post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user_post',
                key: 'id'
            }
        },
    },
    {
        hooks: {
            beforeCreate : (record, options) => {
                record.dataValues.createdAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
                console.log(`Before Create Hook DataVal Created at:${record.dataValues.createdAt}`)
                // record.dataValues.updatedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
            },
            afterCreate : (record, options) => {
                record.dataValues.createdAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
                console.log(`After Create DataVal Created at:${record.dataValues.createdAt}`)
            },
        },
        sequelize,
        timestamps: true, // Should I be using timestamps true? Or just add a data field...
        updatedAt: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    }
);

module.exports = Comment;
