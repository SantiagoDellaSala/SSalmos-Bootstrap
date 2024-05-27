module.exports = (sequelize, DataTypes) => {
    const alias = 'User';
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }
    const config = {
        tableName: 'users',
        timestamps: true
    }
    const User = sequelize.define(alias, cols, config);

    User.associate = (models) => {
        User.belongsTo(models.Role, {
            foreignKey: 'roleId',
            as: 'role'
        });
    };

    return User;
};
