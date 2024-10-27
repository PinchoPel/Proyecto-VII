const mongoose = require("mongoose");

const connectDB = async () => {
try {
await mongoose.connect(process.env.DB_URL)
 console.log("Proyecto VII conectado");
 } catch (error) {
 console.log("la bbdd no funciona");
}
}
module.exports = {connectDB}