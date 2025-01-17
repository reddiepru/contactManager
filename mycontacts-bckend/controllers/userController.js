const asyncHandler= require("express-async-handler");
const User= require("../models/userModel");
const bcrypt= require("bcrypt");
const jwt=require("jsonwebtoken");
// @desc Register a user
// @route post api/user/register
//public access

const registerUser= asyncHandler(async(req, res) => {
    const {username,email,password}= req.body;
    if(!username||!password||!email){
        res.status(400);
        throw new Error("All fields are mandatory");
    }


    const userAvailable= await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already Registered");
    }

    //Hash Password
    const hashedPassword= await bcrypt.hash(password,10);
    console.log("Hashed Password", hashedPassword);
    const user= await User.create({
        username,
        email,
        password:hashedPassword,
    });
    
    if(user){
        res.status(201).json({_id:user.id,email:user.email});
    }else{
        res.status(400);
        throw new Error("User data is not valid");
    }
    res.json({message:"Register the user"});
});




const loginUser= asyncHandler(async(req,res)=>{
    const {email,password}= req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields area mandatory");
    }

    const user= await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken= jwt.sign({
            user: {
                username: user.username,
                email:user.email,
                id: user.id,
            },
        },
         process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:"10m"}
    );
        res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("Email or password is not valid");
    }
    
});


//@access private
const currentUser= asyncHandler(async(req,res)=>{
    res.json(req.user);
});

module.exports={registerUser,loginUser,currentUser};