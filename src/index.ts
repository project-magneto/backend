import express from 'express'

const app = express();

app.use(express.json());

const PORT = 3000;

app.get('/', (_, res) => {
    console.log('hello world');
    res.send('hello world');
});

app.listen(PORT, () => console.log(`||SERVER||${PORT}`));