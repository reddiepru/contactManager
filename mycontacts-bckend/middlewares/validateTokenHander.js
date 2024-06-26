const asyncHandler= require("express-async-handler");
const jwt= require("jsonwebtoken");
const validateToken=asyncHandler(async(req,res,next)=>{
    let token;
    let authHeader= req.headers.Authorization || req.headers.authorization;
    // console.log(authHeader)   
    // the token can be attached to the header of the packet from the client either in the authorization section with a specific name and associated jwt with bearer as its prefix. If not, it can be sent in the Bearer section itself.. So both the fields must be checked.. and the keyword bearer differenciates them.
    if(authHeader && authHeader.startsWith("Bearer")){
        token= authHeader.split(" ")[1];
        // console.log(token);
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err){
                res.status(401);
                throw new Error("The User is not authorized");
            }
            req.user= decoded.user;
            next();
            // the decoded data is decoded and stored to user.
        });
        if(!token){
            res.status(401);
            throw new Error(" The token is missing USer not authorized");
        }
    }
});

module.exports= validateToken;