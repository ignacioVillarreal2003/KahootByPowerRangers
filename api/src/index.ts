import express from 'express'
import administradorRouter from './routes/administrador'
import usuarioRouter from './routes/usuario'
import { ICalificarActividad } from './routes/ICalificarActividad'

const app = express()
app.use(express.json())
const jwt = require('jsonwebtoken');
const PORT = 3000

app.use('/api/administrador', administradorRouter)
app.use('/api/usuario', usuarioRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

export const listaPuntuaciones: ICalificarActividad[] = [];
export const listaUsuarios: string[] = [];

/* Middleware */
export function authenticate(req: any, res: any, next: any) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).send('Unauthorized');
    } else {
        const token: string = authorizationHeader.split(' ')[1];
        try {
            jwt.verify(token, 'shhhhh');
            next();
        } catch (err) {
            console.log(err);
            const error = new Error("Error! Something went wrong.");
            return next(error);
        }
    }
}

/* Generar tokens */
function generateAccessToken(username: string) {
    return jwt.sign({ user: username }, 'shhhhh', { expiresIn: '1h' });
}

app.post('/registrarUsuario', (req, res) => {
    /* Registro en base de datos */
    const token = generateAccessToken(req.body.username);
    res.send(token);
});

app.post('/loguearUsuario', (req, res) => {
    /* Logueo en base de datos */
    let users: userInfo[] = [];
    fetch('http://localhost:3000/posts', {method: 'GET'})
        .then(response => response.json())
        .then(data => {
            users = data;
            users.forEach(user => {
                if (req.body.username == user.username && req.body.password == user.password) {
                    const token = generateAccessToken(req.body.username);
                    res.send(token);
                }
            });
            res.status(400).send({
                message: "Datos de logueo incorrectos."
            });
        }, () => {
            res.status(500).send({
                message: "Error al conectar a la BD."
            });
        });
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