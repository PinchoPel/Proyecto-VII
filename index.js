require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");
const birdRoutes = require("./src/api/routes/birds");
const reserveRoutes = require("./src/api/routes/reserves");
const userRoutes = require("./src/api/routes/users");

const app = express();
connectDB();

app.use(express.json());

app.use("/api/v1/birds", birdRoutes);
app.use("/api/v1/reserves", reserveRoutes);
app.use("/api/v1/users", userRoutes);

app.use("/prueba", (req,res,next) => {
    return res.status(200).json("proyecto VII ok")
});

app.use("*", (req,res,next)=>{
    return res.status(404).json("servidor no encontrado")
    });

app.listen(3000, ()=>{});