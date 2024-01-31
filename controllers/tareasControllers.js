const getTareas = (req,res) => {
    res.status(200).json({mensaje:'get tareas'})
}

const createTareas = (req,res) => {
    res.status(201).json({mensaje:'create tareas'})
}

const updateTareas = (req,res) => {
    res.status(200).json({mensaje:`tareas con id ${req.params.id}`})
}

const deleteTareas = (req,res) => {
    res.status(200).json({mensaje:`tareas con id ${req.params.id}`})
}

module.exports = {
    getTareas,
    createTareas,
    updateTareas,
    deleteTareas
}