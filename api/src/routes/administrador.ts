import express from 'express'
import { jwt } from '../index';
import { IActividad } from './interfaces/IActividad';
import { IPropuesta } from './interfaces/IPropuesta';
import { IJuego } from './interfaces/IJuego';
import { mongoose } from '../index';
import { delay } from '../index';
import { numActividades } from '../index';

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

router.post('/iniciarJuego', (req, res) => {
    // Acá llamaría a la base de datos con la id de la actividad
    let propuesta: IPropuesta = req.body.propuesta;
    let actividades: IActividad[] = propuesta.listaActividades;
    let conteo = 1;
    numActividades(actividades.length);
    delay(actividades, conteo);
    res.status(200).send({
        message: "Iniciando Juego."
    });
});

/* Actividades */
///////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/crearActividad', authenticate, async (req, res) => {
    try {
        // Obtener actividad de la base de datos
        const actividad: IActividad | null = await getActividad(req.body.titulo).then((res) => {
            const act = res[0]
            if (act !== undefined) {
                const actId = act.id;
                const actTitulo = act.titulo;
                const actDescripcion = act.descripcion;
                const actImagen = act.imagen;

                const activitie: IActividad = {
                    id: actId,
                    titulo: actTitulo,
                    descripcion: actDescripcion,
                    imagen: actImagen
                }
                return activitie;
            } else {
                return null
            }
        });

        // Verificar si el título de la actividad ya existe en actividadesEnBD
        if (actividad !== null) {
            // Si se encuentra una actividad con el mismo título
            return res.status(400).send({ message: "Ya existe una actividad con este título." });
        } else {
            // Si no hay actividad con el mismo título, se guarda la nueva actividad en la base de datos
            postActividad(req.body.id, req.body.titulo, req.body.descripcion, req.body.imagen)
            return res.status(200).send({ message: "Actividad creada con exito." });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Error al conectar a la BD." });
    }
});

router.get('/getActividades', authenticate, async (req, res) => {
    // Obtener las actividades de la base de datos
    try {
        let listaActividades: IActividad[] = [];
        await getActividades().then((res) => {
            res.forEach((element: any) => {
                const actId = element.id;
                const actTitulo = element.titulo;
                const actDescripcion = element.descripcion;
                const actImagen = element.imagen;

                const activitie: IActividad = {
                    id: actId,
                    titulo: actTitulo,
                    descripcion: actDescripcion,
                    imagen: actImagen
                }
                listaActividades.push(activitie);
            });
        });
        if (listaActividades.length > 0) {
            res.status(200).send({ actividades: listaActividades });
        } else {
            res.status(400).send({ message: "No hay actividades disponibles." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error al conectar a la BD." });
    }
});

router.get('/getActividad/:id', authenticate, async (req, res) => {
    try {
        const actividad: IActividad | null = await getActividad(req.body.titulo).then((res) => {
            const act = res[0]
            if (act !== undefined) {
                const actId = act.id;
                const actTitulo = act.titulo;
                const actDescripcion = act.descripcion;
                const actImagen = act.imagen;

                const activitie: IActividad = {
                    id: actId,
                    titulo: actTitulo,
                    descripcion: actDescripcion,
                    imagen: actImagen
                }
                return activitie;
            } else {
                return null
            }
        });
        if (actividad !== null) {
            res.status(200).send({ actividadEncontrada: actividad });
        } else {
            res.status(400).send({ message: "Actividad no encontrada." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error al conectar a la BD." });
    }
});

/* Operaciones en base de datos */
var actividadSchema = mongoose.Schema({
    id: String,
    titulo: String,
    descripcion: String,
    imagen: String
});

const Actividad = mongoose.model('Actividad', actividadSchema, 'Actividades');

const getActividad = async (titulo: string) => {
    try {
        const actividad = await Actividad.find({ titulo: { $eq: titulo } });
        if (actividad) {
            return actividad;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};

const getActividades = async () => {
    try {
        const actividad = await Actividad.find();
        if (actividad) {
            return actividad;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};

function postActividad(id: string, titulo: string, descripcion: string, imagen: string): boolean {
    var actividad = new Actividad({
        id: id,
        titulo: titulo,
        descripcion: descripcion,
        imagen: imagen
    });
    actividad.save()
        .then(() => {
            return true;
        })
        .catch((err: any) => {
            return false;
        });
    return false;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

/* Propuestas */
///////////////////////////////////////////////////////////////////////////////////////////////////////////

router.post('/crearPropuesta', authenticate, async (req, res) => {
    try {
        // Obtener propuesta de la base de datos
        const propuesta: IPropuesta | null = await getPropuesta(req.body.titulo).then((res) => {
            const prop = res[0]
            if (prop !== undefined) {
                const propId = prop.id;
                const propTitulo = prop.titulo;
                const proplistaActividades = prop.listaActividades;

                const proposal: IPropuesta = {
                    id: propId,
                    titulo: propTitulo,
                    listaActividades: proplistaActividades
                }
                return proposal;
            } else {
                return null
            }
        });
        if (propuesta !== null) {
            // Si se encuentra una propuesta con el mismo título
            return res.status(400).send({ message: "Ya existe una propuesta con este título." });
        } else {
            // Si no hay propuestas con el mismo título, se guarda la nueva propuesta en la base de datos
            postPropuesta(req.body.id, req.body.titulo, req.body.listaActividades)
            return res.status(200).send({ message: "Propuesta creada con exito." });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Error al conectar a la BD." });
    }
})


router.get('/getPropuestas', authenticate, async (req, res) => {
    try {
        let listaPropuestas: IPropuesta[] = [];
        await getPropuestas().then((res) => {
            res.forEach((element: any) => {
                const propId = element.id;
                const propTitulo = element.titulo;
                const propListaActividades = element.listaActividades;

                const proposal: IPropuesta = {
                    id: propId,
                    titulo: propTitulo,
                    listaActividades: propListaActividades
                }

                listaPropuestas.push(proposal);
            });
        });
        if (listaPropuestas.length > 0) {
            res.status(200).send({ propuestas: listaPropuestas });
        } else {
            res.status(400).send({ message: "No hay propuestas disponibles." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error al conectar a la BD." });
    }
});


router.get('/getPropuesta/:id', authenticate, async (req, res) => {
    try {
        const propuesta: IPropuesta | null = await getPropuesta(req.body.titulo).then((res) => {
            const prop = res[0]
            if (prop !== undefined) {
                const propId = prop.id;
                const propTitulo = prop.titulo;
                const proplistaActividades = prop.listaActividades;

                const proposal: IPropuesta = {
                    id: propId,
                    titulo: propTitulo,
                    listaActividades: proplistaActividades
                }
                return proposal;
            } else {
                return null;
            }
        });
        if (propuesta !== null) {
            res.status(200).send({ propuestaEncontrada: propuesta });
        } else {
            res.status(400).send({ message: "Propuesta no encontrada." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error al conectar a la BD." });
    }
});

/* Operaciones en base de datos */
var propuestaSchema = mongoose.Schema({
    id: String,
    titulo: String,
    listaActividades: []
});

const Propuesta = mongoose.model('Propuesta', propuestaSchema, 'Propuestas');

const getPropuesta = async (titulo: string) => {
    try {
        const propuesta = await Propuesta.find({ titulo: { $eq: titulo } });
        if (propuesta) {
            return propuesta;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};

const getPropuestas = async () => {
    try {
        const propuesta = await Propuesta.find({});
        if (propuesta) {
            return propuesta;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};

function postPropuesta(id: string, titulo: string, listaActividades: any): boolean {
    var propuesta = new Propuesta({
        id: id,
        titulo: titulo,
        listaActividades: listaActividades
    });
    propuesta.save()
        .then(() => {
            return true;
        })
        .catch((err: any) => {
            return false;
        });
    return false;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

/* Juegos */
///////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/crearJuego', authenticate, async (req, res) => {
    try {
        const juego: IJuego | null = await getJuego(req.body.pin).then((res) => {
            const j = res[0]
            if (j !== undefined) {
                const jTitulo = j.titulo;
                const jCodigo = j.codigo;
                const jLink = j.link;
                const jPropuesta = j.propuesta;

                const game: IJuego = {
                    titulo: jTitulo,
                    pin: jCodigo,
                    link: jLink,
                    propuesta: jPropuesta
                }
                return game;
            } else {
                return null;
            }
        });
        if (juego !== null) {
            // Si se encuentra un juego con el mismo pin
            return res.status(400).send({ message: "Ya existe un juego con este pin." });
        } else {
            // Si no hay juegos con el mismo pin, se guarda el nuevo juego en la base de datos
            postJuego(req.body.titulo, req.body.pin, req.body.link, req.body.propuesta)
            return res.status(200).send({ message: "Propuesta creada con exito." });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Error al conectar a la BD." });
    }
});

router.get('/getJuego/:id', authenticate, async (req, res) => {
    try {
        const juego: IJuego | null = await getJuego(req.body.pin).then((res) => {
            const j = res[0]
            if (j !== undefined) {
                const jTitulo = j.titulo;
                const jCodigo = j.codigo;
                const jLink = j.link;
                const jPropuesta = j.propuesta;

                const game: IJuego = {
                    titulo: jTitulo,
                    pin: jCodigo,
                    link: jLink,
                    propuesta: jPropuesta
                }
                return game;
            } else {
                return null;
            }
        });
        if (juego !== null) {
            res.status(200).send({ juegoEncontrado: juego });
        } else {
            res.status(400).send({ message: "Juego no encontrado." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error al conectar a la BD." });
    }
});

/* Operaciones en base de datos */
var juegoSchema = mongoose.Schema({
    titulo: String,
    pin: String,
    link: String,
    propuesta: []
});

const Juego = mongoose.model('Juego', juegoSchema, 'Juegos');

const getJuego = async (pin: string) => {
    try {
        const juego = await Juego.find({ pin: { $eq: pin } });
        if (juego) {
            return juego;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};

function postJuego(titulo: string, pin: string, link: string, propuesta: string): boolean {
    var juego = new Juego({
        titulo: titulo,
        pin: pin,
        link: link,
        propuesta: propuesta,
    });
    juego.save()
        .then(() => {
            return true;
        })
        .catch((err: any) => {
            return false;
        });
    return false;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

/* Calificaciones */
///////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/calificacionActividad/:id', authenticate, async (req, res) => { // mismo juego verificando el pin??
    try {
        const actividadId = req.params.id;
        const pin: string = req.query.pin as string;
        let total = 0;
        await getVoto(actividadId, pin).then((res) => {
            res.forEach((element: any) => {
                const califi = element.calificacion;
                total += califi
            });
        });
        return res.send({ total: total });
    } catch (error) {
        return res.status(500).send({ message: "Error al conectar a la BD." });
    }
})

interface Diccionario {
    [clave: string]: number;
}

router.get('/topCalificaciones/:pin', authenticate, async (req, res) => {
    try {
        // Total calificaciones
        const sumaPorId: Diccionario = {};

        const juego: IJuego | null = await getJuego(req.params.pin).then((res) => {
            const j = res[0]
            if (j !== undefined) {
                const jTitulo = j.titulo;
                const jCodigo = j.codigo;
                const jLink = j.link;
                const jPropuesta = j.propuesta;

                const game: IJuego = {
                    titulo: jTitulo,
                    pin: jCodigo,
                    link: jLink,
                    propuesta: jPropuesta
                }
                return game;
            } else {
                return null;
            }
        });
        if (juego !== null) {
            // Si se encuentra un juego con el mismo pin
            const actividades: IActividad[] = juego.propuesta.listaActividades;
            actividades.forEach(async (element) => {
                const calificacionVoto = await getVoto(element.id, req.params.pin).then((res) => {
                    const v = res[0];
                    if (v !== undefined) {
                        return v.calificacion;
                    } else {
                        return null;
                    }
                });
                if (calificacionVoto !== null) {
                    if (sumaPorId[element.id]) {
                        sumaPorId[element.id] += calificacionVoto;
                    } else {
                        sumaPorId[element.id] = calificacionVoto;
                    }
                }
            })
        }
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
        return res.send({ actividadesTop: actividadesTop });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Error al conectar a la BD." });
    }

})

// Voto 
var votosSchema = mongoose.Schema({
    idActividad: String,
    puntuacion: Number,
    pin: String
});

export const Voto = mongoose.model('Voto', votosSchema, 'Votos');

const getVoto = async (idActividad: string, pin: string) => {
    try {
        const voto = await Voto.find({ idActividad: { $eq: idActividad }, pin: { $eq: pin } });
        if (voto) {
            return voto;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////



export default router;