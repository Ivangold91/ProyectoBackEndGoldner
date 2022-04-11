const express = require('express');
const router = express.Router(); 
const {crearPersona, vistaPersonas, editarPersonas, borrarPersonas, consultaaxios} = require('../controller/controller.js')
const {check} = require('express-validator')

/* GET users listing. */
router.get('/ver', vistaPersonas);
router.put('/editar/:id', editarPersonas);
router.delete('/eliminar/:id', borrarPersonas);

router.post('/crear', [
    check('name').not().isEmpty().withMessage("El nombre es requerido"),
    check('gender').not().isEmpty().withMessage("El genero es requerido"),
    check('age').not().isEmpty().withMessage("La edad es requerido")
] , crearPersona);

router.get('/consulta', consultaaxios)

module.exports = router;
