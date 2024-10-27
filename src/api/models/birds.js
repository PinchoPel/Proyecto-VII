const mongoose = require("mongoose");

let birdSchema = new mongoose.Schema({
    imagen: {type: String, required: true},
    nombre_comun: {type: String, required: true},
    nombre_cientifico: {type: String, required: true},
    alimentacion: {type: [String], enum: ["insectos", "peces", "anfibios", "carroña", "mamíferos", "aves", "frutas", "semillas", "lombrices", "crustáceos"], required: true},
    migratoria: { type: String, enum: ["si", "no"], required: true},
    habitat: {type: [String], enum: ["bosque", "praderas", "humedales", "marismas", "montañas", "estuarios", "llanuras", "acantilados","área urbana", "semiáridas", "costa", "desierto"], required: true},
    verificado: {type: Boolean}
},{
    timestamps: true,
    collection: "birds",
    versionKey: false
});

const Bird = mongoose.model("bird", birdSchema, "birds");

module.exports = Bird;