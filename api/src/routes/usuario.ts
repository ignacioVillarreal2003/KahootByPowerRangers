import express from 'express'
import { listaUsuariosEnPantalla } from '../index';
import { Voto } from './administrador';
import { enviarJugador } from '../index';

const router = express.Router()

/* Usuarios en pantalla */
///////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/entrarAJuego', (req, res) => {
    try {
        const usuario = {
            nombre: req.body.nombreUsuario,
            pin: req.body.pin,
            link: req.body.link,
            imagen: req.body.imagen
        }
        listaUsuariosEnPantalla.push(usuario);
        enviarJugador({nombre: usuario.nombre as string, imagen: usuario.imagen as string});
        return res.status(200).send({ message: "Todo bien" });
    } catch (error) {
        return res.status(400).send({ message: "Error inesperado." });
    }
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////

/* Calificar actividades */
router.post('/calificarActividad', (req, res) => {
    try {
        postVoto(req.body.idActividad, req.body.calificacion, req.body.pin)
        return res.status(200).send({ message: "Votacion efectuada." });
    } catch (error) {
        return res.status(500).send({ message: "Error al conectar a la BD." });
    }
})

/* Operaciones en base de datos */
function postVoto(idActividad: string, calificacion: number, pin: string) {
    var voto = new Voto({
        idActividad: idActividad,
        puntuacion: calificacion,
        pin: pin
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