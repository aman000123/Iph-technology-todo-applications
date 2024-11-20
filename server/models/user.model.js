import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const USER = sequelize.define('user', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        name: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        mobile: {
            allowNull: true,
            type: DataTypes.STRING,
        }
    }, {
        sequelize,
        modelName: 'user',

    });



    return USER;
};
