const express = require('express');
const Router = express.Router();
const { AddToCart, GetCartItems, RemoveFromCart, UpdateCartItems } = require("../controllers/cartControllers")

Router.route('/addcart')
    .post(AddToCart)

Router.route('/getcartitems')
    .get(GetCartItems)

Router.route('/removecart/:id')
    .post(RemoveFromCart)

Router.route('/updatecartitem/:id')
    .patch(UpdateCartItems)

module.exports = Router;