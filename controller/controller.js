const {Persona} = require('../models/model')
const {validationResult} = require('express-validator')
const axios = require('axios')

const vistaUno = (req, res)=>{
    res.render('index', { title: 'Express' });
}

const vistaPersonas = async (req, res) =>{
    const vistapersona = await Persona.find()
    res.json({vistapersona})
}

const crearPersona = async (req, res)=>{
    // const {name,gender} = req.body
    const error = validationResult (req)
    if ( error.isEmpty() ) { 
        const creaPersona = new Persona (req.body)
        await creaPersona.save()
        res.json({creaPersona, msg: 'OK'})
    } else {
        res.json(error)
    }
    
}

const consultaaxios = async (req,res) => {
    const resultado = await axios.get("https://swapi.dev/api/",{ timeout: 10000 }).catch((err) => {
        err.origin = 'Error getting URL';
        throw err;
    });
    res.json(resultado.data.films)
}

const editarPersonas = async (req,res) => {
    const {id} = req.params
    const name = req.body
    const personaEditado = await Persona.findByIdAndUpdate(id,name)
    res.json(personaEditado)
}



const borrarPersonas = async (req,res) => {
    const personaBorrado = await Persona.findbyidandremove(req.params.id)
    res.json(personaBorrado)
}

module.exports = {vistaUno, crearPersona, vistaPersonas, editarPersonas, borrarPersonas, consultaaxios}