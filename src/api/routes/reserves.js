const { isAdmin } = require("../../middlewares/auth");
const { getAllReserves, postReserve, updateReserves, deleteReserve, deleteBirdInReserve, terrainReserves } = require("../controllers/reserve");

const reserveRoutes = require("express").Router();

reserveRoutes.get("/terreno", terrainReserves);
reserveRoutes.get("/", getAllReserves);

reserveRoutes.post("/", [isAdmin], postReserve);

reserveRoutes.put("/:id", [isAdmin], updateReserves);

reserveRoutes.delete("/:idReserve/bird/:idBird", [isAdmin], deleteBirdInReserve);
reserveRoutes.delete("/:id", [isAdmin], deleteReserve);

module.exports = reserveRoutes;