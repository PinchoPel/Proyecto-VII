const { isContributor, isAdmin } = require("../../middlewares/auth");
const { getAllBirds, deleteBirds, postBirdsSuggestion, updateBirdsSuggestion, postBirdsVerify, getAllBirdsAdmin, updateBirdsVerify, getBirdsByFood, getBirdsByEnviroment } = require("../controllers/birds");

const birdRoutes = require("express").Router();

birdRoutes.get("/admin", [isAdmin], getAllBirdsAdmin);
birdRoutes.get("/alimentacion", getBirdsByFood);
birdRoutes.get("/habitat/:habitat", getBirdsByEnviroment);
birdRoutes.get("/", getAllBirds);

birdRoutes.post("/:idReserve",[isContributor], postBirdsSuggestion);
birdRoutes.post("/:idReserve/admin", [isAdmin], postBirdsVerify);

birdRoutes.put("/:id",[isContributor], updateBirdsSuggestion);
birdRoutes.put("/verify/:id", [isAdmin], updateBirdsVerify);

birdRoutes.delete("/:id",[isAdmin], deleteBirds);


module.exports = birdRoutes;