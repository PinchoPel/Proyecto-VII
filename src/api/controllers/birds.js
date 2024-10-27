const Bird = require("../models/birds");
const Reserve = require("../models/reserves");

const getAllBirds = async (req,res,next) => {
    try {
        allBirds = await Bird.find({verificado: true});
        return res.status(200).json(allBirds)
    } catch (error) {
        return res.status(400).json("Ha fallado la petición")
    }
};

const getAllBirdsAdmin = async (req,res,next) => {
    try {
        allBirds = await Bird.find();
        return res.status(200).json(allBirds)
    } catch (error) {
        return res.status(400).json("Ha fallado la petición")
    }
};

const getBirdsByFood = async (req,res,next) => {
    try {
        let {alimentacion} = req.query;
        if (!alimentacion) {
            return res.status(400).json("Tipo de alimento no válido");
        };
        let food = await Bird.find({alimentacion:{ $in: [alimentacion]}});
        return res.status(200).json(food);
    } catch (error) {
        return res.status(400).json("Ha fallado la petición")
    }
};

const getBirdsByEnviroment = async (req,res,next) => {
    try {
        let {habitat} = req.params;
        if (!habitat) {
            return res.status(400).json("Tipo de hábitat no válido");
        };
        let enviroment = await Bird.find({habitat:{ $in: [habitat]}});
        return res.status(200).json(enviroment);
    } catch (error) {
        return res.status(400).json("Ha fallado la petición")
    }
};

const postBirdsSuggestion = async (req,res,next) => {
    try {

        let {idReserve} = req.params;
        const reserve = await Reserve.findById(idReserve);

        let newBird = new Bird(
          { imagen: req.body.imagen,
            nombre_comun: req.body.nombre_comun,
            nombre_cientifico: req.body.nombre_cientifico,
            alimentacion: req.body.alimentacion,
            migratoria: req.body.migratoria,
            habitat: req.body.habitat,
            verificado: false}
        );

         await newBird.save();

         reserve.aves.push(newBird._id);
        await reserve.save();

        return res.status(201).json(newBird);
    } catch (error) {
        return res.status(400).json("Ha fallado la creación del perfil del nuevo pájaro")
    }  
};

const postBirdsVerify = async (req,res,next) => {
    try {

        let {idReserve} = req.params;
        const reserve = await Reserve.findById(idReserve);

        let newBird = new Bird(
          { imagen: req.body.imagen,
            nombre_comun: req.body.nombre_comun,
            nombre_cientifico: req.body.nombre_cientifico,
            alimentacion: req.body.alimentacion,
            migratoria: req.body.migratoria,
            habitat: req.body.habitat,
            verificado: true}
        );

         await newBird.save();

         reserve.aves.push(newBird._id);
        await reserve.save();

        return res.status(201).json(newBird);
    } catch (error) {
        return res.status(400).json("Ha fallado la creación del perfil del nuevo pájaro")
    }  
};

const updateBirdsSuggestion = async (req,res,next) => {
    try {
        let {id} = req.params;
        const updateBird = await Bird.findByIdAndUpdate(id,{...req.body, verificado: false},{new:true});
        return res.status(200).json(updateBird);
    } catch (error) {
        return res.status(400).json("Ha fallado la actualización del perfil del nuevo pájaro")
    }
};

const updateBirdsVerify = async (req,res,next) => { 
    try {
        let {id} = req.params;
        const updateBird = await Bird.findByIdAndUpdate(id,req.body,{new:true});
        return res.status(200).json(updateBird);
    } catch (error) {
        return res.status(400).json("Ha fallado la actualización del perfil del nuevo pájaro")
    }
};

const deleteBirds = async (req,res,next) => {
    try {
       let {id} = req.params;
        deletedBird = await Bird.findByIdAndDelete(id);
        return res.status(200).json(deletedBird);
    } catch (error) {
        return res.status(400).json("No se ha podido borrar el registro")
    }
}

module.exports = {getAllBirds,postBirdsSuggestion,updateBirdsSuggestion,deleteBirds,postBirdsVerify,getAllBirdsAdmin,updateBirdsVerify,getBirdsByFood,getBirdsByEnviroment};