const express = require('express');
const cors = require('cors');
const path = require('path')
const { dbConnection } = require('./db/config')
require('dotenv').config();


const app = express();

//Conecion a la DB
dbConnection()


//Directorio publico
app.use(express.static('public'))

//cors
app.use( cors() );

//Lectura y parseo del body
app.use( express.json() ); 

//rutas
app.use('/api/auth', require('./routes/auth'));

app.get('*', (req, res) => {
    res.sendFile( path.resolve(__dirname, 'public/index.html') )
});

app.listen(process.env.PORT, () => {
    console.log(`El servidor express esta corriendo en el puerto ${process.env.PORT}`)
    console.log('Hola buenos dias');
})