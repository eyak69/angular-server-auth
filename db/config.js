const mongoose = require("mongoose");

const dbConnection = async () => {
    try{
        //console.log(process.env.BD_CNN)
        await mongoose.connect(process.env.BD_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        })
        console.log('Base de Datos ONLINE')
    }
    catch(error) {
        console.log(error)
        throw new Error('Error al conectar con la base de datos');
    }

}  

module.exports = {
    dbConnection
}