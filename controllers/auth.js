const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {

  const { name, email, password } = req.body;

  try {

    // Verificar si el email existe
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe un usuario con ese email'
      })
    }

    // Crear usuario con el modelo
    const dbUser = new Usuario(req.body);

    // Hashear el password
    const salt = bcrypt.genSaltSync();
    dbUser.password = bcrypt.hashSync(password, salt);

    // Generar el JsonWebToken
    const token = await generarJWT(dbUser.id, name);

    // Guardar usuario en db
    await dbUser.save();

    // Generar respuesta exitosa
    return res.status(201).json({
      ok: true,
      uid: dbUser.id,
      name,
      token
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }



}

const loginUsuario = (req, res = response) => {

  const { email, password } = req.body;

  return res.json({
    ok: true,
    msg: 'Login de usuario /'
  })
}

const revalidarToken = (req, res = response) => {
  return res.json({
    ok: true,
    msg: '/renew'
  });
}


module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken
}