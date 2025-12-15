const express = require('express')
const Router = express.Router()
const { GetAllProduct, GetSingleProduct } = require("../controllers/productControllers")

Router.route('/getproducts')
    .get(GetAllProduct)

Router.route('/getproduct/:id')
    .get(GetSingleProduct)


module.exports = Router