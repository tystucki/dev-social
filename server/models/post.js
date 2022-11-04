const { DataTypes } = require('sequelize')
const { sequelize } = require('../util/database')

module.exports = {
    Post: sequelize.define('post', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            autoNull: false,
            primaryKey: true

        },
        title: DataTypes.STRING,
        content: DataTypes.TEXT,
        privateStatus: DataTypes.BOOLEAN
    })

}

    