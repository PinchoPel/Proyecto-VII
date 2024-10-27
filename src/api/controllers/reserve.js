const Reserve = require("../models/reserves")

const getAllReserves = async (req,res,next) => {
    try {
        allReserves = await Reserve.find().populate({path: "aves", match: {verificado: true}});
        return res.status(200).json(allReserves);
    } catch (error) {
        return res.status(400).json("No se establece conexión")
    }
};

const terrainReserves = async (req,res,next) => {
    try {
        const {terreno} = req.query;
        if (!terreno) {
            return res.status(400).json("Tipo de terreno no válido");
        };
        let terrains = await Reserve.find({terreno:{ $in: [terreno]}});
        return res.status(200).json(terrains);
    } catch (error) {
        return res.status(400).json("No se establece conexión")
    }
};

const postReserve = async (req,res,next) => {
    try {
        let newReserve = new Reserve({
            nombre: req.body.nombre,
            terreno: req.body.terreno,
            precipitacion: req.body.precipitacion,
            superficie: req.body.superficie
        } )

        await newReserve.save();

        return res.status(200).json(newReserve);
    } catch (error) {
        return res.status(400).json("Ha fallado la creación de una nueva reserva")
    }
};

const updateReserves = async (req,res,next) => {
    try {
        let {id} = req.params;
        let {aves} = req.body;
        
        if (req.body.aves) {
            let oldReserve = await Reserve.findById(id);

            let existingBirdIds = new Set(oldReserve.aves.map(birdId => birdId.toString()));
            
          let newBirds = aves.filter(newBird => !existingBirdIds.has(newBird));
            
            if (newBirds.length > 0) {
                let updatedReserve = await Reserve.findByIdAndUpdate(id, 
                { $addToSet: { aves: { $each: newBirds } } }, {new: true});
                return res.status(200).json(updatedReserve);
            }
            else {return res.status(400).json('Ningún ave nueva ha sido incluida')}         
        }
        else{
            let updatedReserve = await Reserve.findByIdAndUpdate(id, {...req.body}, {new: true});
            return res.status(200).json(updatedReserve);
        }
    } catch (error) {
        return res.status(400).json("Fallo al intentar actualizar los datos de la reserva")
    }
};

const deleteReserve = async (req,res,next) => {
    try {
     let  {id} = req.params;
       let deletedReserve = await Reserve.findByIdAndDelete(id);
        return res.status(200).json(deletedReserve);
    } catch (error) {
        return res.status(400).json("No se ha podido borrar el registro")
    }
};

const deleteBirdInReserve = async (req,res,next) => {
    try {
        let {idReserve, idBird} = req.params;
        let reserve = await Reserve.findById(idReserve);

        let birdIndex = reserve.aves.indexOf(idBird);
       
        if (birdIndex < 0) {
            return res.status(400).json("Pájaro no encontrado en esta reserva")
        }
        reserve.aves.splice(birdIndex, 1);
        await reserve.save();
        return res.status(200).json(reserve);
    } catch (error) {
        return res.status(400).json("No se ha podido borrar el registro")
    }
}

module.exports = {getAllReserves,postReserve,updateReserves,deleteReserve,deleteBirdInReserve,terrainReserves};