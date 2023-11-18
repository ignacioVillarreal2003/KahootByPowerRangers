import express from 'express'
import { IUsuario } from './routes/interfaces/IUsuario';

export const listaUsuariosEnPantalla: any[] = [];


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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});


/* mongoose */
export const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ignaciovillarreal20031231:As8k2oosvQQJON92@cluster0.hce3g5c.mongodb.net/pruebaProyecto')
    .then(() => console.log('Connected!'));


// Usuario
var userSchema = mongoose.Schema({
    username: String,
    password: String
});

const Usuario = mongoose.model('Usuario', userSchema, 'Usuarios');

const getUsuario = async (username: string) => {
    try {
        const usuario = await Usuario.find({ username: { $eq: username } });
        if (usuario) {
            return usuario;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};

function postUsuario(username: string, password: string): boolean {
    var usuario = new Usuario({
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




/* Generar tokens */
function generateAccessToken(username: string) {
    return jwt.sign({ user: username }, 'shhhhh', { expiresIn: '1h' });
}

app.post('/registrarUsuario', async (req, res) => {
    try {
        // Obtener usuario de la base de datos
        const usuario: IUsuario | null = await getUsuario(req.body.username).then((res) => {
            const usr = res[0]
            if (usr !== undefined) {
                const usrName = usr.username;
                const usrPass = usr.password;
                const user: IUsuario = {
                    username: usrName,
                    password: usrPass
                }
                return user;
            } else {
                return null;
            }
        });
        // Verificar si el usuario ya está registrado
        if (usuario !== null) {
            return res.status(400).send({ message: "El usuario ya está registrado." });
        } else {
            try {
                // Hashear contraseña
                const password = await hashPassword(req.body.password);
                // Guardar el nuevo usuario en la base de datos
                postUsuario(req.body.username, password);
                // Se envía el token si todo está correcto
                const token = generateAccessToken(req.body.username);
                return res.send({ token: token });
            } catch (error) {
                return res.status(500).send({ message: "Error al hashear contraseña." });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Error al conectar a la BD." });
    }
});

app.post('/loguearUsuario', async (req, res) => {
    try {
        // Obtener usuario de la base de datos
        const usuario: IUsuario | null = await getUsuario(req.body.username).then((res) => {
            const usr = res[0]
            if (usr !== undefined) {
                const usrName = usr.username;
                const usrPass = usr.password;
                const user: IUsuario = {
                    username: usrName,
                    password: usrPass
                }
                return user;
            } else {
                return null;
            }
        });
        // Verificar si el usuario ya está registrado
        if (usuario !== null) {
            // compara contraseñas
            const match = await comparePassword(req.body.password, usuario.password);
            if (req.body.username == usuario.username && match) {
                const token = generateAccessToken(req.body.username);
                // Se envía el token si todo está correcto
                return res.send({ token: token });
            } else {
                return res.status(400).send({ message: "Contraseña incorrecta." });
            }
        } else {
            return res.status(400).send({ message: "El usuario no está registrado." });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Error al conectar a la BD." });
    }
});


app.get('/getToken', (req, res) => {
    return res.send({ token: jwt.verify(req.body.token, 'shhhhh') });
})




import administradorRouter from './routes/administrador'
import usuarioRouter from './routes/usuario'

app.use('/administrador', administradorRouter);
app.use('/usuario', usuarioRouter);

// npm run dev
// json-server --watch db.json

