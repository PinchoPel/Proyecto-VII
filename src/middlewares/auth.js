const User = require("../api/models/users");
const { verifyToken } = require("../config/jwt");

const isAdmin = async (req,res,next) => {
    try {

        const token = req.headers.authorization.split(" ")[1];
       
        let {id} = verifyToken(token);

        const user = await User.findById(id);

    if (user.rol === "admin") { 
        next();
    }
    else{
        return res.status(400).json(error)
    }
    } catch (error) {
        return res.status(400).json(error)
    }
};

const isContributor = async (req,res,next) => {
    try {

        const token = req.headers.authorization.split(" ")[1];
       
        let {id} = verifyToken(token);

        const user = await User.findById(id);

    if (user.rol === "contributor") { 
        next();
    }
    else{
        return res.status(400).json(error)
    }
    } catch (error) {
        return res.status(400).json(error)
    }
};

module.exports = {isAdmin,isContributor}