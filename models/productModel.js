const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({

    name:{
        type: String,
        require:[true,"please enter product name"],
        trim: true,
        maxLength: [100,"product name cannot exceed 100 characters"]
    },
    price:{
        type: Number,
        require: true,
        default: 0.0
    },
    description:{
        type: String,
        required: [true,"please enter product description"]
    },
    ratings:{
        type: String,
        default: 0
    },
    images:[
        {
            image:{
                type: String,
                required: true
            },
        }
    ],
    category:{
        type: String,
        require: [true,"please enter product category"],
        enum:{
            values:[
                'Electronics',
                 'Mobile Phones',
                 'Laptops',
                 'Accessories',
                 'HeadPhones',
                 'Food',
                 'Books',
                 'Clothes/shoes',
                 'Beauty/Health',
                 'Sports',
                 'Outdoor',
                 'Home'
            ],
            message: "please select correct category"
        }
    },
    seller:{
        type: String,
        required: [true,"please enter product seller"]
    },
    stock:{
        type: Number,
        required: [true,"please enter product stock"],
        maxLength: [20,"product stock cannot exceed 20"]
    },
    numOfReviews:{
        type: Number,
        default: 0
    },
    reviews:[
        {
            name:{
                type: String,
                required: true
            },
            rating:{
                type: String,
                required: true
            },
            comment:{
                type: String,
                required: true
            }
        }
    ],
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

 let Schema = mongoose.model('product',productsSchema)

 module.exports = Schema