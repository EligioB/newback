const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModels')


const crearUser = asyncHandler(async(req,res)=> {
    const { name, email,password } = req.body
    if(!name || !email || !password) {
        res.status(400)
        throw new error('datos')
    }

    const userExiste = await User.findOne({emai})
    if (userExiste) {
        res.status(400)
        throw new error('usuario existe')
    }
    // creamos hash

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    // crear  user
    
    const user = await User.create({
        name,
        emai,
        password: hashedPassword
    })

    if (user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.emai
        })
    } else {
        res.status(400)
        throw new Error('no se puede')
    }
    
})

const loginUser = asyncHandler(async(req,res)=> {

    const { email, password} = req.body
    // verify user email
    const user = await User.findOne({email})
    // if user exists verify password
    if (user && (await bcrypt.compare(password,user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generarToken(user.id)
        })

    } else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
    
}
)
const datosUser = asyncHandler(async(req,res)=> {
    res.status(201).json(req.user)
    
})

// generate token
const generarToken = (id_usuario) =>{
    return jwt.sign({id_usuario},process.env.JWT_SECRET,{
        expiresIn: '30d'
    })
}

module.exports={
    crearUser,
    loginUser,
    datosUser
}