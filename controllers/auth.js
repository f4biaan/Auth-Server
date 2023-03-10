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
      email,
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

const loginUsuario = async (req, res = response) => {

  const { email, password } = req.body;

  try {

    // Verificar si el email existe
    const dbUser = await Usuario.findOne({ email });

    if (!dbUser) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo no existe'
      })
    }

    // Verificar el password hace match
    const validPassword = bcrypt.compareSync(password, dbUser.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'El password no es válido'
      })
    }

    // Generar el JsonWebToken
    const token = await generarJWT(dbUser.id, dbUser.name);

    // Respuesta del servicio
    return res.json({
      ok: true,
      uid: dbUser.id,
      name: dbUser.name,
      email: dbUser.email,
      token
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }
}

const revalidarToken = async (req, res = response) => {

  const { uid } = req;

  // Leer db para obtener el email
  const dbUser = await Usuario.findById(uid);

  // Generar un nuevo JWT y retornarlo en esta petición
  const token = await generarJWT(uid, dbUser.name);
  
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