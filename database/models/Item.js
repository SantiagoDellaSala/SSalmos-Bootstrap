module.exports = (sequelize, DataTypes) => {
  const alias = 'Item';
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    shoppingcartId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  };
  const config = {
    tableName: 'items',
    timestamps: true
  };
  const Item = sequelize.define(alias, cols, config);

  Item.associate = (models) => {
    Item.belongsTo(models.Shoppingcart, {
      foreignKey: 'shoppingcartId',
      as: 'shoppingcart'
    });
    Item.belongsTo(models.Product, {
      foreignKey: 'productId',
      as: 'product'
    });
  };

  return Item;
};