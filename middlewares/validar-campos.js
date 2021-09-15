const { validationResult } = require("express-validator");
const {response, request } = require('express');


const validarCampos = (req = request, res = response, next) => {

    //la validacion fue inyectada en el router con un check
    const errors = validationResult( req );
    if (!errors.isEmpty()){
        //hay errores
        return res.status(400).json(
            {
                ok: false,
                errors: errors.mapped()
            }
        )
    }
    //para que ejecute el proximo middleware
    next();
}


module.exports = { 
    validarCampos
}