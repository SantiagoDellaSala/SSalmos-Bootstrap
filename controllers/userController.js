module.exports = {
    register : (req, res) => {
        res.render('register');
      },
    login : (req, res) => {
        res.render('login');
    },
    edit : (req, res) => {
        res.render('editProfile')
    },
    profile : (req, res) => {
        res.render('profile')
    },
    cart : (req, res) => {
        res.render('shoppingCart')
    }
};