module.exports = (sequelize, DataTypes) => {
    const alias = 'State';
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
        tableName: 'states',
        timestamps: false
    }
    const State = sequelize.define(alias, cols, config);

    State.associate = (models) => {
        State.hasMany(models.Shoppingcart, {
            foreignKey: 'stateId',
            as: 'shoppingcarts'
        });
    };

    return State;
};
