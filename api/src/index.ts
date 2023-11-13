import express from 'express'
import administradorRouter from './routes/administrador'
import usuarioRouter from './routes/usuario'

/* Configuracion de servidor */
const cors = require('cors');

const app = express();

app.use(express.json());

export const jwt = require('jsonwebtoken');

const PORT = 3001;

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200,
    methods: "GET, PUT, POST, DELETE"
};

app.use(cors(corsOptions));
app.use('/administrador', administradorRouter);
app.use('/usuario', usuarioRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

/* mongoose */

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://EquipoAAAV:PowerRangers5@cluster0.vgvmulv.mongodb.net/Proyecto')
    .then(() => console.log('Connected!'));

/*var userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    usuario: String,
    contraseña: String
});

var actividadSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: String,
    titulo: String,
    descripcion: String,
    imagen: String
});
*/
/*var propuestaSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: String,
    titulo: String,
    listaActividades: []
});

var juegoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: String,
    titulo: String,
    pin: String,
    propuesta: { type: propuestaSchema, default: {} }
});*/

var votosSchema = mongoose.Schema({
    idActividad: String,
    puntuacion: Number
});


/*const Usuario = mongoose.model('Usuario', userSchema, 'Usuarios');
const Actividad = mongoose.model('Actividad', actividadSchema, 'Actividades');
const Propuesta = mongoose.model('Propuesta', propuestaSchema, 'Propuestas');*/
//const Juego = mongoose.model('Juego', juegoSchema, 'Juegos');
const Voto = mongoose.model('Voto', votosSchema, 'Votos');


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

function miFuncionDespuesDe5Segundos(){
    postVoto("23434534534", 6);
    obtenerVoto("23434534534").then((res)=> console.log(res));
}

setTimeout(miFuncionDespuesDe5Segundos, 11000);

const obtenerVoto = async (idActividad: string) => {
    try {
        const voto = await Voto.find({idActividad:{$eq: idActividad}} );
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



/*function postUsuario(username: string, password: string): boolean {
    var usuario = new Usuario({
        _id: new mongoose.Types.ObjectId(),
        username: username,
        password: password
    });
    usuario.save()
        .then(() => {
            return true;
        })
        .catch((err: any) => {
            return false;
        });
    return false;
}

function postActividad(id: string, titulo: string, descripcion: string, imagen: string): boolean {
    var actividad = new Actividad({
        _id: new mongoose.Types.ObjectId(),
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

function postPropuesta(id: string, titulo: string, listaActividades: any): boolean {
    var propuesta = new Propuesta({
        _id: new mongoose.Types.ObjectId(),
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

function postJuego(id: string, titulo: string, codigo: string, link: string, propuesta: string): boolean {
    var juego = new Juego({
        _id: new mongoose.Types.ObjectId(),
        id: id,
        titulo: titulo,
        codigo: codigo,
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

const obtenerJuego = async (id: string) => {
    try {
        const juego = await Juego.findById(id);
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
*/


/* BCrypt */
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function hashPassword(password: string) {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error al hashear la contraseña:', error);
        throw error;
    }
}

async function comparePassword(inputPassword: string, hashedPassword: string) {
    try {
        const match = await bcrypt.compare(inputPassword, hashedPassword);
        return match;
    } catch (error) {
        // Manejo de errores
        console.error('Error al comparar las contraseñas:', error);
        throw error;
    }
}

/* Variables e interfazes */
import { ICalificarActividad } from './routes/ICalificarActividad';

export const listaUsuariosEnPantalla: string[] = [];
export const listaPuntuacionesActividad: ICalificarActividad[] = [];



/* Generar tokens */

function generateAccessToken(username: string) {
    return jwt.sign({ user: username }, 'shhhhh', { expiresIn: '1h' });
}

app.post('/registrarUsuario', async (req, res) => {
    try {
        // Obtener usuarios de la base de datos
        const response = await fetch('http://localhost:3000/usuarios');
        const users: userInfo[] = await response.json();

        // Verificar si el usuario ya está registrado
        const existingUser = users.find(user => user.username === req.body.username);
        if (existingUser) {
            return res.status(400).send({
                message: "El usuario ya está registrado."
            });
        } else {
            try {
                // Hashear contraseña
                const password = await hashPassword(req.body.password);

                // Obtener el último ID y registrar el nuevo usuario
                const lastId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
                const newUser = { id: lastId, username: req.body.username, password: password };

                // Guardar el nuevo usuario en la base de datos
                await fetch('http://localhost:3000/usuarios', {
                    method: "POST",
                    body: JSON.stringify(newUser),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const token = generateAccessToken(req.body.username);
                return res.send({ token: token }); // Se envía el token si todo está correcto
            } catch (error) {
                return res.status(500).send({
                    message: "Error al hashear contraseña."
                });
            }
        }
    } catch (error) {
        return res.status(500).send({
            message: "Error al conectar a la BD."
        });
    }
});

app.post('/loguearUsuario', async (req, res) => {
    try {
        // Obtener usuarios de la base de datos
        const response = await fetch('http://localhost:3000/usuarios');
        const users: userInfo[] = await response.json();

        // Verificar si el usuario ya está registrado
        const existingUser = users.find(user => user.username === req.body.username);
        if (existingUser) {
            // compara contraseñas
            const match = await comparePassword(req.body.password, existingUser.password);
            if (req.body.username == existingUser.username && match) {
                const token = generateAccessToken(req.body.username);
                return res.send({ token: token }); // Se envía el token si todo está correcto
            } else {
                return res.status(400).send({
                    message: "Contraseña incorrecta."
                });
            }
        } else {
            return res.status(400).send({
                message: "El usuario no está registrado."
            });
        }
    } catch (error) {
        return res.status(500).send({
            message: "Error al conectar a la BD."
        });
    }
});


app.get('/getToken', (req, res) => {
    return res.send({ token: jwt.verify(req.body.token, 'shhhhh') });
})

interface userInfo {
    id: number,
    username: string,
    password: string
}


// npm run dev
// json-server --watch db.json

