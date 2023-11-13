import express from 'express'
import { listaPuntuacionesActividad, jwt } from '../index';
import { IActividad } from './IActividad';
import { IPropuesta } from './IPropuesta';
import { IJuego } from './IJuego';

const router = express.Router()

/* Middleware */
export function authenticate(req: any, res: any, next: any) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).send({
            message: "Unauthorized"
        });
    } else {
        const token: string = authorizationHeader.split(' ')[1];
        try {
            jwt.verify(token, 'shhhhh');
            next();
        } catch (err: any) {
            if (err.name === 'TokenExpiredError') {
                res.status(401).send({
                    message: "TokenExpiredError"
                });
            } else {
                const error = new Error("Error! Something went wrong.");
                return next(error);
            }
        }
    }
}

/* IMPORTANTE: MANEJAR ERRORES DE SI NO ENCUENTRA ID ... */

router.post('/crearActividad', authenticate, async (req, res) => {
    const actividad = {
        id: req.body.id,
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        imagen: req.body.imagen,
    };
    try {
        const act = await fetch('http://localhost:3000/actividades');
        const actividadesEnBD = await act.json();

        // Verificar si el título de la actividad ya existe en actividadesEnBD
        const actividadExistente = actividadesEnBD.find((act: IActividad) => act.titulo === actividad.titulo);

        if (actividadExistente) {
            // Si se encuentra una actividad con el mismo título
            return res.status(400).send({
                message: "Ya existe una actividad con este título.",
            });
        } else {
            // Si no hay actividad con el mismo título, se guarda la nueva actividad en la base de datos
            await fetch('http://localhost:3000/actividades', {
                method: "POST",
                body: JSON.stringify(actividad),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return res.status(200).send({
                message: "Actividad creada con exito.",
            });
        }
    } catch (error) {
        return res.status(500).send({
            message: "Error al conectar a la BD."
        });
    }
});


router.get('/getActividades', authenticate, async (req, res) => {
    // Obtener las actividades de la base de datos
    try {
        const response = await fetch('http://localhost:3000/actividades');
        const actividades: IActividad[] = await response.json();
        res.status(200).send({ actividades: actividades });
    } catch (error) {
        res.status(500).send({
            message: "Error al conectar a la BD."
        });
    }
});


router.get('/getActividad/:id', authenticate, async (req, res) => {
    try {
        const response = await fetch('http://localhost:3000/actividades');
        const actividades: IActividad[] = await response.json();
        const actividadEncontrada = actividades.filter(actividad => actividad.id === req.params.id);
        res.status(200).send({ actividadEncontrada: actividadEncontrada });
    } catch (error) {
        res.status(500).send({
            message: "Error al conectar a la BD."
        });
    }
});


router.post('/crearPropuesta', authenticate, async (req, res) => {
    const propuesta: IPropuesta = {
        id: req.body.id,
        titulo: req.body.titulo,
        listaActividades: req.body.listaActividades
    }
    // Guardar la propuesta en la base de datos
    try {
        const prop = await fetch('http://localhost:3000/propuestas');
        const propuestasEnBD = await prop.json();

        // Verificar si el título de la propuesta ya existe en propuestasEnBD
        const propuestaExistente = propuestasEnBD.find((prop: IPropuesta) => prop.titulo === propuesta.titulo);

        if (propuestaExistente) {
            // Si se encuentra una propuesta con el mismo título
            return res.status(400).send({
                message: "Ya existe una propuesta con este título.",
            });
        } else {
            // Si no hay propuestas con el mismo título, se guarda la nueva propuesta en la base de datos
            await fetch('http://localhost:3000/propuestas', {
                method: "POST",
                body: JSON.stringify(propuesta),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return res.status(200).send({
                message: "Propuesta creada con exito.",
            });
        }
    } catch (error) {
        return res.status(500).send({
            message: "Error al conectar a la BD."
        });
    }
})

router.get('/getPropuestas', authenticate, async (req, res) => {
    try {
        const response = await fetch('http://localhost:3000/propuestas');
        const propuestas: IActividad[] = await response.json();
        res.status(200).send({ propuestas: propuestas });
    } catch (error) {
        res.status(500).send({
            message: "Error al conectar a la BD."
        });
    }
});


router.get('/getPropuesta/:id', authenticate, async (req, res) => {
    try {
        const response = await fetch('http://localhost:3000/propuestas');
        const propuestas: IActividad[] = await response.json();
        const propuestaEncontrada = propuestas.filter((propuesta) => propuesta.id === req.params.id);
        res.status(200).send({ propuestaEncontrada: propuestaEncontrada });
    } catch (error) {
        res.status(500).send({
            message: "Error al conectar a la BD."
        });
    }
});

router.post('/crearJuego', authenticate, async (req, res) => {
    const juego: IJuego = {
        id: req.body.id,
        titulo: req.body.titulo,
        codigo: req.body.codigo,
        link: req.body.link,
        propuesta: req.body.propuesta
    };
    try {
        const jue = await fetch('http://localhost:3000/juego');
        const juegosEnBD = await jue.json();

        // Verificar si el título de la actividad ya existe en actividadesEnBD
        const juegoExistente = juegosEnBD.find((game: IJuego) => game.titulo === juego.titulo);

        if (juegoExistente) {
            // Si se encuentra una actividad con el mismo título
            return res.status(400).send({
                message: "Ya existe un juego con este título.",
            });
        } else {
            // Si no hay actividad con el mismo título, se guarda la nueva actividad en la base de datos
            await fetch('http://localhost:3000/actividades', {
                method: "POST",
                body: JSON.stringify(juego),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return res.status(200).send({
                message: "Juego creado con exito.",
            });
        }
    } catch (error) {
        return res.status(500).send({
            message: "Error al conectar a la BD."
        });
    }
});


router.get('/calificacionActividad/:id', authenticate, (req, res) => {
    const actividadId = req.params.id;
    const actDeID = listaPuntuacionesActividad.filter(id => id.idActividad = actividadId)
    var total = 0;
    actDeID.forEach(x => total += x.calificacion)
    res.send({ total: total });
})

interface Diccionario {
    [clave: string]: number;
}

router.get('/topCalificaciones', authenticate, (req, res) => {
    // Total calificaciones
    const sumaPorId: Diccionario = {};
    listaPuntuacionesActividad.forEach(obj => {
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

    res.send({ actividadesTop: actividadesTop });
})



export default router;