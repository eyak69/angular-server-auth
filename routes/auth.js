const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router();


//crear un nuevo usuario
router.post('/new', [
    check('email', 'El mail es obligatorio').isEmail(),    
    check('password', 'El password no puede estar vacio').notEmpty(),
    check('password', 'El password es corto').isLength({min:6}),
    check('name','El Nombre no puede estar vacia').notEmpty(),
    validarCampos
], crearUsuario);

//Login de usuario
router.post('/', [
    check('email','El email es obligatorio').isEmail(),
    check('password','El password es obligatoria').isLength({min:6}),
    validarCampos
],loginUsuario);

//Validar y revalidar token
router.get('/renew', validarJWT, revalidarToken);

module.exports = router;

