const mongoose = require("mongoose");
const Reserve = require("../../api/models/reserves");
const reservesSeed = require("../../data/reserves");

const launchSeed = async () => {
    try {
        await mongoose.connect("mongodb+srv://proyectovii:pAqJbuGLmQ2cTB7P@cluster0.instg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

        await Reserve.collection.drop();
        console.log(("bbdd de reservas borrada"));
    
        await Reserve.collection.insertMany(reservesSeed);
        console.log("restauradas las reservas de la bbdd");
        
        await mongoose.disconnect();
        console.log("desconectado de la bbdd");
    } catch (error) {
        console.log(("No se ha lanzado la semilla"));
    }  
};

launchSeed();