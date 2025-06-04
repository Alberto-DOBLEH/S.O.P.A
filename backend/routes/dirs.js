const express = require('express');
const router = express.Router();

const {
  crearDireccion,
  obtenerTodasLasDirecciones,
  obtenerDireccionesPorUsuario,
  actualizarDireccion,
  eliminarDireccion
} = require('../controllers/dirController');

// Crear una nueva dirección
router.post('/', crearDireccion);

// Obtener todas las direcciones
router.get('/', obtenerTodasLasDirecciones);

// Obtener direcciones por ID de usuario
router.get('/:id_usuario', obtenerDireccionesPorUsuario);

router.put('/:id_direccion', actualizarDireccion);

router.delete('/:id_direccion', eliminarDireccion);


module.exports = router;