//para traer el tipado automatico de los objetos
const { response, request } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJwt } = require('../helpers/jwt');


const crearUsuario = async (req = request, res = response) => {
    const { name, email, password } = req.body;

    try {
        // varificar el mail
        const usuario = await Usuario.findOne({ email: email });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe con ese email'
            });
        }

        //crear el usuario con el modelo
        const dbUser = new Usuario(req.body);

        //encriptar la contraseña
        const salt = bcrypt.genSaltSync(10);
        dbUser.password = bcrypt.hashSync(password, salt);

        //generar el jason web token
        const token = await generarJwt(dbUser.id, name)

        //crear usuario de base de datos
        await dbUser.save();

        //generar una respuesta existosa
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name: name,
            email: email,
            token: token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hay un error hablar con el administrador'
        });
    }
}

const loginUsuario = async (req = request, res = response) => {

    const { email, password } = req.body;
    //console.log(email, password)
    try {
        //si todo bien
        //busca el mail
        const dbUser = await Usuario.findOne({ email: email });
        if (!dbUser) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo no existe'
            });
        }
        //compara la pass enviada con la de la base de datos
        const validPassword = bcrypt.compareSync(password, dbUser.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'La password es incorrecta'
            });
        }

        //generar el jason web token
        const token = await generarJwt(dbUser.id, dbUser.name)

        //generar una respuesta existosa
        return res.status(200).json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            token: token
        });



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hay un error hablar con el administrador'
        });
    }
}

const revalidarToken = async (req = request, res = response) => {

    const {uid } = req;

    const dbUser = await Usuario.findById(uid);

    //generar el jason web token
    const token = await generarJwt(uid, dbUser.name)

    return res.json({
        ok: true,
        uid,
        name: dbUser.name, 
        email: dbUser.email,
        token
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}