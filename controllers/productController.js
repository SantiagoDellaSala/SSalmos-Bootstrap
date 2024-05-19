const db = require('../database/models/Product')

module.exports = {
    detail : (req, res) => {
        res.render('productDetail')
    },
    editProduct : (req, res) => {
        res.render('productEdit')
    }
}