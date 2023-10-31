import express from 'express'
import { listaUsuarios, listaPuntuacionesActividad } from '../index';
import { ICalificarActividad } from './ICalificarActividad';


const router = express.Router()

router.post('/agregarUsuario', (req, res)=> {
    const nombreUsuario: string = req.body.usuario
    listaUsuarios.push(nombreUsuario);
    res.send(200)
})

router.post('/calificarActividad', (req, res)=> {
    const obj : ICalificarActividad = {
        idActividad: req.body.actividadId,
        calificacion: req.body.calificacion
    }
    listaPuntuacionesActividad.push(obj)
    res.send(200);
})


export default router