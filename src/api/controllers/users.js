const { generateSign, verifyToken } = require("../../config/jwt");
const User = require("../models/users");
const bcrypt = require("bcrypt");


const getAllUser = async (req,res,next) => {
    try {
        allUsers = await User.find();
        return res.status(200).json(allUsers);
    } catch (error) {
        return res.status(400).json("No ha sido posible acceder a la información");
    }
};

const getUserProfile = async (req,res,next) => {
    try {
        let {id} = req.params;
        user = await User.findById(id);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json("No ha sido posible acceder a la información");
    }
}

const getOwnprofile = async (req,res,next) => {
    try {
      let  {id} = req.params;
      const token = req.headers.authorization.split(" ")[1];
        
        let LogedUser = verifyToken(token);
      
        if (id == LogedUser.id){
            profile = await User.findById(id);
            return res.status(200).json(profile);
        }
    else{
        return res.status(400).json("No ha sido posible acceder a la información");
    }
    } catch (error) {
        return res.status(400).json("No ha sido posible acceder a la información");
    }
};

const register = async (req,res,next) => {
    try {
        let newUser = new User({
            nickname: req.body.nickname,
            password: req.body.password,
            rol: "contributor"
        });
        let duplicatedUser = await User.findOne({nickname: req.body.nickname}); 

        if (duplicatedUser) {
            return res.status(400).json("nombre de usuario existente");
        };

        let userSaved = await newUser.save();

        return res.status(201).json(userSaved);
    } catch (error) {
        return res.status(400).json("No ha sido posible darse de alta en el sistema")
    }
};

const login = async (req,res,next) => {
    try {
        let {nickname, password} = req.body;  
        let user = await User.findOne({nickname});
        let correctPassword = bcrypt.compare(password, user.password);
        if (!correctPassword) {
            return res.status(400).json("Usuario o contraseña incorrectos");
        }
        const token = generateSign(user._id);
        return res.status(200).json({user, token});
    } catch (error) {
        return res.status(400).json("Usuario o contraseña incorrectos")
    }
};

const updateOwnUser = async (req,res,next) => {
    try {
        let {id} = req.params;
        const token = req.headers.authorization.split(" ")[1];
        
        let LogedUser = verifyToken(token);
      
        if (id == LogedUser.id) {
            if (req.body.password) {
                let {password} = req.body
                let user = await User.findById(id);
                const newPassword = await bcrypt.hash(password, 10);   
                user.password = newPassword;
                await user.save();
                const isMatch = await bcrypt.compare(newPassword, user.password);
                console.log(isMatch);
                return res.status(200) .json(user);
            }
            else {
                let {rol, ...changes} = req.body;
                let updatedUser = await User.findByIdAndUpdate(id, {$set: changes}, {new:true});
                return res.status(200) .json(updatedUser);  
            }
        }
        else{
            return res.status(400).json("No ha sido posible actualizar el perfil")
        }
    } catch (error) {
        return res.status(400).json("No ha sido posible actualizar el perfil")
    }
};

const modifyUser = async (req,res,next) => {
    try {
        let {id} = req.params;
        let updatedUser = await User.findByIdAndUpdate(id, req.body, {new:true, runvalidators: true});
        if (req.body.rol && !['admin', 'contributor'].includes(req.body.rol)) {
            return res.status(400).json( "El rol solo puede ser admin o contributor");
        }
        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(400).json("No ha sido posible actualizar el perfil")
    }
}

const deleteAnyUser = async (req,res,next) => {
    try {
        let {id} = req.params;
        let deletedUser = await User.findByIdAndDelete(id);
        return res.status(200).json(deletedUser);
    } catch (error) {
        return res.status(400).json("No ha sido posible borrar al usuario")
    }
};

const deleteOwnUser = async (req,res,next) => {
    try {
        let {id} = req.params;
        const token = req.headers.authorization.split(" ")[1];
        
        let LogedUser = verifyToken(token);
      
        if (id == LogedUser.id) {
        let deletedUser = await User.findByIdAndDelete(id);
        return res.status(200) .json(deletedUser);  
        }
        else{
            return res.status(400).json("No ha sido posible borrar al usuario")
        }
    } catch (error) {
        return res.status(400).json("No ha sido posible borrar al usuario")
    }
};


module.exports = {register,deleteAnyUser,login,deleteOwnUser,getAllUser,getOwnprofile,getUserProfile,updateOwnUser,modifyUser};