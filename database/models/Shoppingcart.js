module.exports = (sequelize, DataTypes) => {
    const alias = 'Shoppingcart';
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        stateId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }
    const config = {
        tableName: 'shoppingcarts',
        timestamps: true
    }
    const Shoppingcart = sequelize.define(alias, cols, config);

    Shoppingcart.associate = (models) => {
        Shoppingcart.belongsTo(models.Item, {
            foreignKey: 'productId',
            as: 'product'
        });
        Shoppingcart.belongsTo(models.State, {
            foreignKey: 'stateId',
            as: 'state'
        });
    };

    return Shoppingcart;
};
