const ProductModel = require("../models/productModel")

exports.GetAllProduct = async (req, res) => {
    const limit = 30;
    try {
        let products
        products = await ProductModel.find()
            .limit(limit);

        res.status(200).json({
            message: "Fetch all product successful",
            status: "successful",
            data: products
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}


exports.GetSingleProduct = async (req, res) => {
    const { id } = req.params
    if (!id) res.status(404).json({ message: "Missing product id" })
    try {
        const Product = await ProductModel.findById(id)
        res.status(200).json({
            message: "Fetch product successfull",
            status: "successfull",
            data: Product
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.mesage
        })
    }
}
