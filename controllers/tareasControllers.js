const asyncHandler = require('express-async-handler')
const Tarea = require('../models/tareasModels')



const getTareas =asyncHandler (async(req,res) => {
    const tareas = await Tarea.find({user: req.user.id})
    res.status(200).json({mensaje:'get tareas'})
})

const createTareas =asyncHandler (async(req,res) => {
    if(!req.body.descripcion){
        res.status(400).json({message:"por favor agrega descripcion"})
        throw new Error('Por favor teclea una descripcion')
    }
    const tarea = await Tarea.create({
        descripcion: req.body.descripcion,
        user: req.user.id
    })
    res.status(201).json({mensaje:'create tareas'})
})

const updateTareas =asyncHandler(async (req,res) => {
    const tarea = await Tarea.findById(req.params.id)
    if(!tarea){
        res.status(400)
        throw new error ('no existe')
    }

    if (tarea.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("user No permitido")
    } else {
        const tareaUpdated = await Tarea.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.status(200).json(tareaUpdated)
    }

    
})

const deleteTareas =asyncHandler(async (req,res) => {

    const tarea = await Tarea.findById(req.params.id)
    if(!tarea){
        res.status(400)
        throw new error ('no existe')
    }
    
    if (tarea.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("user No permitido")
    }else {
        await Tarea.deleteOne(tarea)
        //const tareaDeleted =  await Tarea.findByIdAndDelete(req.params.id)
    
        res.status(200).json({id: req.params.id})
    }
})



module.exports = {
    getTareas,
    createTareas,
    updateTareas,
    deleteTareas
}