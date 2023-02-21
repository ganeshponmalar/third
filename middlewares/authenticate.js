const ErrorHandler = require('../utils/errorHandler');
const user = require('../models/userModel')
const catchAsyncError = require('./catchAsyncError')

exports.isAuthenticatedUser = catchAsyncError(async(req,res,next)=>{

    const {token} = req.cookies;


    if(!token){
        return next(new ErrorHandler('Login first to handle this resource',401))
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id)
    next();

})


     exports.authorizeRoles = (...roles) =>{
     (req,res,next)=>{
        if(!roles.includes(req.user.roles)){
            return next(new ErrorHandler(`Role ${req.user.role} is not allowed`))
        }
        next()
    }
}






