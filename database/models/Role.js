module.exports = (sequelize, DataTypes) => {
    const alias = 'Role';
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
    }
    const config = {
        tableName: 'roles',
        timestamps: false
    }
    const Role = sequelize.define(alias, cols, config);

    Role.associate = (models) => {
        Role.hasMany(models.User, {
            foreignKey: 'roleId',
            as: 'users'
        });
    };

    return Role;
};