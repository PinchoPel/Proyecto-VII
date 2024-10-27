const { isContributor, isAdmin } = require("../../middlewares/auth");
const { register, login, deleteAnyUser, deleteOwnUser, getAllUser, getOwnprofile, getUserProfile, updateOwnUser, modifyUser } = require("../controllers/users");

const userRoutes = require("express").Router();

userRoutes.get("/allUsers",[isAdmin], getAllUser);
userRoutes.get("/allUsers/:id", [isAdmin], getUserProfile)
userRoutes.get("/:id",[isContributor],getOwnprofile);

userRoutes.post("/signup", register);
userRoutes.post("/login", login);

userRoutes.put("/changeProfile/:id", [isContributor], updateOwnUser);
userRoutes.put("/modifyUser/:id", [isAdmin], modifyUser);

userRoutes.delete("/deleteAnyUser/:id",[isAdmin], deleteAnyUser);
userRoutes.delete("/deleteOwnUser/:id",[isContributor], deleteOwnUser);

module.exports = userRoutes;