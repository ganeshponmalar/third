const product = require('../models/productModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncError')
const APIFeature = require('../utils/apiFeatures')

//get products
exports.getProducts = async (req,res,next)=>{
    console.log(req.body)
    const resPerPage = 2;
  const apiFeatures =   new APIFeature(product.find(),req.query).search().filter().paginate(resPerPage)
 

  const products =  await  apiFeatures.query;
    res.status(200).json({
        success: true,
        count: products.length,
        products
    })
   
}

//creat products -/api/v1/product/new
  exports.newProduct = catchAsyncError(async(req,res,next)=>{
    const products = product.create(req.body)
    res.status(201).json({
        sucess: true,
        products
    })
  });

//getting a single products-/api/v1/product/:id

  exports.getSingleProduct = async(req,res,next)=>{
    const products  = await product.findById(req.params.id)

    if(!products){

      return next(new ErrorHandler('product not found',400));

    }

    res.status(201).json({
        success: true,
        products
    })

  }

  





  //update product here let see - api/v1/product/:id
  exports.updateProduct = async(req,res,next)=>{
    let products = await product.findById(req.params.id);
    if(!products){
        res.status(404).json({
            success: false,
            message:'product not found'
        })
    }
   products  = await product.findByIdAndUpdate(req.params.id,req.body,{
    new: true, // to get updated data
    runValidators: true
   })

   res.status(200).json({
    success: true,
    products
   })

  }


  //now see the delete -api/v1/product/:id

  exports.deleteProduct = async (req,res,next)=>{
   const products = await product.findById(req.params.id);

   if(!products){
    return res.status(404).json({
        success: false,
        message:"product not found"
    });
   }

  await product.remove()

  res.status(200).json({
    success: true,
    message: "product Deleted!"
  })

  }



