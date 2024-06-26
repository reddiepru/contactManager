const {constants}= require("../constants");

const errorHandler=(error,req,res,next)=>{
    const statusCode= res.statusCode? res.statusCode : 500;
    switch(statusCode){
        case constants.NOT_FOUND:
            res.json({title:"404 Not found",message:error.message, stackTrace: error.stack});
            break;

        case constants.VALIDATION_ERROR:
            res.json({title:"Validation Failed",message:error.message, stackTrace: error.stack});
            break;

        case constants.UNAUTHORIZED:
            res.json({title:"UNAUTHORIZED",message:error.message, stackTrace: error.stack});
            break;

        case constants.FORBIDDEN:
                res.json({title:"FORBIDDEN",message:error.message, stackTrace: error.stack});
                break;

        case constants.SERVER_ERROR:
            res.json({title:"SERVER_ERROR",message:error.message, stackTrace: error.stack});
            break;

        default:
            console.log("No Error DETECTED");
            break;

    }
   
    
};

module.exports=errorHandler;