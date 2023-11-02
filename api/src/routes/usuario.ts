import express from 'express'
import { listaUsuariosEnPantalla, listaPuntuacionesActividad } from '../index';
import { ICalificarActividad } from './ICalificarActividad';


const router = express.Router()

router.post('/agregarUsuarioEnPantalla', (req, res)=> {
    const nombreUsuario: string = req.body.usuario
    listaUsuariosEnPantalla.push(nombreUsuario);
    res.status(200)
})

router.post('/calificarActividad', (req, res)=> {
    const obj : ICalificarActividad = {
        idActividad: req.body.actividadId,
        calificacion: req.body.calificacion
    }
    listaPuntuacionesActividad.push(obj)
    res.status(200);
})


export default router