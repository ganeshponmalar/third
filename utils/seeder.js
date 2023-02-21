const products = require('../data/products.json')
const product = require('../models/productModel')
const dotenv = require('dotenv');
const connectDatabase = require('../config/database')

dotenv.config({path:'server/config/config.env'})

connectDatabase()




const seeProducts = async () => {
    try {


        await product.deleteMany();
        console.log('products deleted!')


        await product.insertMany(products);
        console.log('All products added')
    } catch (error) {
        console.log(error.message);
    }
    process.exit()

}

sendProducts()