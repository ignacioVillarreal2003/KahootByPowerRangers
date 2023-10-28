import express from 'express'

const router = express.Router()

router.get('/', (req, res)=> {
    res.send(['1', '2', '3'])
})

router.post('/', (req, res)=> {
    res.send({'hello': 'world'})
})

router.get('/test', (req, res) => {
    console.log("hello world");
    res.send('V 1.1');
});


export default router