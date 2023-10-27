import express from 'express'
import cardRouter from './routes/cards'

const app = express()
app.use(express.json()) 
const jwt = require('jsonwebtoken');
const PORT = 3001

/* Middleware */
function authenticate(req: any, res: any, next: any) {
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



/* Operaciones */
app.get('/test', authenticate, (req, res) => {
    console.log("hello world");
    res.send('V 1.1');
});

app.use('/api/cards', cardRouter)

/*
Función que debería conectar a la BD y devolver true o false.
No implementado todavía.
async function login(username: string, password: string) : Promise<boolean> {
    let users: userInfo[] = [];
    fetch('http://localhost:3000/posts', {method: 'GET'})
        .then(response => response.json())
        .then(data => {
            users = data;
            users.forEach(user => {
                if (username == user.username && password == user.password) true;
            });
            return false;
        }, () => {
            return false;
        });
    return false;
};
*/

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

interface userInfo {
    id: number,
    username: string,
    password: string
}

//npm run dev