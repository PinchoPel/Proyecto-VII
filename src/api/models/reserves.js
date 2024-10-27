const mongoose = require("mongoose");
const Bird = require("./birds");

let reserveSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    terreno:{type: [String], required: true},
    precipitacion: {type: String},
    superficie: {type: String, required: true},
    aves: [{type: mongoose.Types.ObjectId, ref: Bird}]
},{
    timestamps: true,
    collection: "reserves",
    versionKey: false
});

const Reserve = mongoose.model("reserve",reserveSchema,"reserves");

module.exports = Reserve;