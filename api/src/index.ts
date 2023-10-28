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

/* Middleware */
export function authenticate(req: any, res: any, next: any) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).send('Unauthorized');
    } else {
        const token : string = authorizationHeader.split(' ')[1];
        try {
            jwt.verify(token, 'shhhhh');
            next();
          } catch(err) {
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
    const token = generateAccessToken(req.body.username);
    res.send(token);
});

app.get('/getToken', (req, res) => {
    res.send(jwt.verify(req.body.token, 'shhhhh'))
})


//npm run dev