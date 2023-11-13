import express from 'express'
import { listaUsuariosEnPantalla } from '../index';
import { Voto } from './administrador';

const router = express.Router()

/* Usuarios en pantalla */
///////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/agregarUsuarioEnPantalla', (req, res) => {
    const nombreUsuario: string = req.body.usuario
    listaUsuariosEnPantalla.push(nombreUsuario);
    res.status(200)
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////

/* Calificar actividades */
router.post('/calificarActividad', (req, res) => {
    try {
        postVoto(req.body.idActividad, req.body.calificacion)
        return res.status(200).send({ message: "Votacion efectuada." });
    } catch (error) {
        return res.status(500).send({ message: "Error al conectar a la BD." });
    }
})

/* Operaciones en base de datos */
function postVoto(idActividad: string, calificacion: number) {
    var voto = new Voto({
        idActividad: idActividad,
        puntuacion: calificacion
    });
    voto.save()
        .then(() => {
            console.log(true);
            return true;
        })
        .catch((err: any) => {
            console.log(false)
            return false;
        });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////



export default router