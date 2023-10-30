import express from 'express'
import { listaUsuarios, listaPuntuaciones } from '../index';
import { ICalificarActividad } from './ICalificarActividad';


const router = express.Router()

router.post('/agregarUsuario', (req, res)=> {
    const nombreUsuario: string = req.body.usuario
    listaUsuarios.push(nombreUsuario);
    res.send("")
})

router.post('/calificarActividad/:id', (req, res)=> {
    const obj : ICalificarActividad = {
        idActividad: req.body.actividadId,
        calificacion: req.body.calificacion
    }
    listaPuntuaciones.push(obj)
    res.send("");
})


export default router