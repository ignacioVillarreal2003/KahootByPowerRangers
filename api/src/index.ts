import express from 'express'
import administradorRouter from './routes/administrador'
import usuarioRouter from './routes/usuario'
import { ICalificarActividad } from './routes/ICalificarActividad';

const cors = require('cors');

const app = express()
app.use(express.json())
export const jwt = require('jsonwebtoken');
const PORT = 3001;
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200,
    methods: "GET, PUT, POST, DELETE"
}

app.use(cors(corsOptions));
app.use('/api/administrador', administradorRouter)
app.use('/api/usuario', usuarioRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

export const listaUsuarios: string[] = [];
export const listaPuntuaciones: ICalificarActividad[] = [];


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
            // Obtener el último ID y registrar el nuevo usuario
            const lastId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
            const newUser = { id: lastId, username: req.body.username, password: req.body.password };

            // Guardar el nuevo usuario en la base de datos
            await fetch('http://localhost:3000/usuarios', {
                method: "POST",
                body: JSON.stringify(newUser),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const token = generateAccessToken(req.body.username);
            return res.send(token); // Se envía el token si todo está correcto
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
            if (req.body.username == existingUser.username && req.body.password == existingUser.password) {
                const token = generateAccessToken(req.body.username);
                return res.send(token); // Se envía el token si todo está correcto
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
    res.send(jwt.verify(req.body.token, 'shhhhh'))
})

interface userInfo {
    id: number,
    username: string,
    password: string
}

//npm run dev
// json-server --watch db.json