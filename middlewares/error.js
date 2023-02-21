module.exports = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;


    if (process.env.NODE_ENV == 'development') {
        res.status(error.statusCode).json({
            success: false,
            message: error.message,
            stack: error.stack,
            error: error

        })

    }

    if (process.env.NODE_ENV == 'production') {

        let message = error.message;

        let error = new Error(message)
          

        if(error.name == "ValidationError"){
            message = Object.values(error.errors).map(value=> value.message)
            error = new Error(message)
        }



        if(error.name == 'castError'){
            message = `resource not found: ${error.path}`;
        }


        res.status(error.statusCode).json({
            success: false,
            message: error.message || 'Internal server Error',
            

        })

    }






}
