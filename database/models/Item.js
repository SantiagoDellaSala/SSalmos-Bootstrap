module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define('Item', {
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
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      shoppingcartId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      tableName: 'items',
      timestamps: true
    });
  
    Item.associate = (models) => {
      Item.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product'
      });
      Item.belongsTo(models.Shoppingcart, {
        foreignKey: 'shoppingcartId',
        as: 'shoppingcart'
      });
    };
  
    return Item;
  };  