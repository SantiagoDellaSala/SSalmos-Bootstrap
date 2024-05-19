module.exports = (sequelize, dataTypes) => {
    const alias = 'Product';
    const cols = {
        id : {
            type : dataTypes.INTEGER,
            primaryKey : true,
            allowNull : false,
            autoIncrement : true
        },
        name : {
            type : dataTypes.STRING,
            allowNull : false,

        },
        price : {
            type : dataTypes.INTEGER.UNSIGNED,
            allowNull : false
        },
        mainImage : {
            type : dataTypes.STRING,
            allowNull : false,
        }
    }
    const config = {
        tableName : 'products',
        timestamps : true
    }
    const Product = sequelize.define(alias, cols, config)
    return Product;
}