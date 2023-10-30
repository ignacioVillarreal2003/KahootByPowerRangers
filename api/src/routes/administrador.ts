import express from 'express'
import { authenticate, listaPuntuaciones } from '../index';

const router = express.Router()

router.post('/crearActividad', authenticate, (req, res)=> {
    const actividad = {
        id : req.body.id,
        titulo : req.body.titulo,
        descripcion : req.body.descripcion,
        imagen : req.body.imagen,
    }
    /* añadir a la base de datos */
    res.send(actividad);
})

router.get('/getActividades', authenticate, (req, res)=> {
    /* agarrar las actividades de la base de datos*/
    res.send("");
})

router.get('/getActividad/:id', authenticate, (req, res)=> {
    /* agarra la actividad de la base de datos */
    res.send("");
})

router.post('/crearPropuesta', authenticate, (req, res)=> {
    const propuesta = {
        id : req.body.id,
        titulo : req.body.titulo,
        listaActividades : req.body.listaActividades
    }
    /* añadir a la base de datos */
    res.send(propuesta);
})

router.get('/getPropuestas', authenticate, (req, res)=> {
    /* agarrar las Propuestas de la base de datos*/
    res.send("");
})

router.get('/getPropuesta/:id', authenticate, (req, res)=> {
    /* agarra la Propuesta de la base de datos */
    res.send("");
})

router.get('/calificacionActividad/:id', authenticate, (req, res)=> {
    const actividadId = req.params.id;
    const actDeID = listaPuntuaciones.filter(id => id.idActividad = actividadId)
    var total = 0;
    actDeID.forEach(x=> total += x.calificacion)
    res.send(total);
})

interface Diccionario {
    [clave: string]: number;
}

router.get('/topCalificaciones', authenticate, (req, res)=> {
    // Total calificaciones
    const sumaPorId : Diccionario = {};
    listaPuntuaciones.forEach(obj => {
        const { idActividad, calificacion } = obj;
        if (sumaPorId[idActividad]) {
            sumaPorId[idActividad] += calificacion;
        } else {
            sumaPorId[idActividad] = calificacion;
        }
    });

    // Encontrar los tres valores máximos de calificación
    const valoresCalificacion = Object.values(sumaPorId);
    const valoresMaximos = valoresCalificacion.sort((a, b) => b - a).slice(0, 3);

    // Filtrar los ID con las calificaciones máximas
    const actividadesTop = Object.keys(sumaPorId)
        .filter(id => valoresMaximos.includes(sumaPorId[id]))
        .map(id => ({
            idActividad: id,
            calificacion: sumaPorId[id]
        }));

    res.json(actividadesTop);
})



export default router