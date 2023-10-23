import express from 'express'
import cardRouter from './routes/cards'

const app = express()
app.use(express.json()) 

const PORT = 3000

function authenticate(req: any, res: any, next: any) { /* solo para administradores */
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).send('Unauthorized');
    } else {
        const token = authorizationHeader.split(' ')[1];
        console.log(token);
        next();
    }
}

app.get('/test', authenticate, (req, res) => {
    console.log("hello world");
    res.send('V 1.1');
});

app.use('/api/cards', cardRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


//npm run dev