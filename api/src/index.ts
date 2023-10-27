import express from 'express'
import cardRouter from './routes/cards'

const app = express()
app.use(express.json()) 
const jwt = require('jsonwebtoken');
const PORT = 3000

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
    const token = generateAccessToken(req.body.username);
    res.send(token);
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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


//npm run dev