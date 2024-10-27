const mongoose = require("mongoose");
const Bird = require("../../api/models/birds");
const birdsSeed = require("../../data/birds");

const launchSeed = async () => {
    try {
        await mongoose.connect("mongodb+srv://proyectovii:pAqJbuGLmQ2cTB7P@cluster0.instg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

        await Bird.collection.drop();
        console.log("borrada bbdd de pájaros");

        await Bird.collection.insertMany(birdsSeed);
        console.log("restaurada bbdd de pájaros");
        
        await mongoose.disconnect()
        console.log(("desconectado de la bbdd"));
        
        
    } catch (error) {
        console.log(("No se ha lanzado la semilla"));
        
    }
}

launchSeed();