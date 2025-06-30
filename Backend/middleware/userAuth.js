const jwt = require('jsonwebtoken');
const User = require('../models/userModel')

const protect = (req,res,next) =>{

    const token = req.cookies.userToken

    if(!token){
        return res.status(401).json({message:'No token authorization denied '})

    }
    console.log("in user auth middleware",token)

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({message:"Token is not valid"});
    }
}

module.exports = {
    protect
}