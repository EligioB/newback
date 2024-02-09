const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../models/userModels')

const protect = asyncHandler(async(req,res,next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //get token
            token = req.headers.authorization.split(" ")[1]
            //verify token
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            // get payload data
            req.user = await User.findById(decoded.id_usuario).select('-password')
            next()

        } catch (error) {
            console.log(error);
            res.status(401).json({msg: 'Not authorized to access this route'})
            
        }
    }

    if(!token){
        res.status(400)
        throw new Error('No token provided')
    }
})


module.exports = {
    protect
}