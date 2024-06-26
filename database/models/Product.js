module.exports = (sequelize, DataTypes) => {
  const alias = "Product";
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    talle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mainImage: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    secondImage: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    thirdImage: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  };
  const config = {
    tableName: "products",
    timestamps: true,
  };
  const Product = sequelize.define(alias, cols, config);

  return Product;
};