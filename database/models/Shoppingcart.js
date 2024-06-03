module.exports = (sequelize, DataTypes) => {
    const alias = 'Shoppingcart';
    const cols = {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      stateId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      userId: {
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
      Shoppingcart.belongsTo(models.State, {
        foreignKey: 'stateId',
        as: 'state'
      });
      Shoppingcart.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      Shoppingcart.hasMany(models.Item, {
        foreignKey: 'shoppingcartId',
        as: 'items'
      });
    };
  
    return Shoppingcart;
  };
  
  