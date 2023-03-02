import express from 'express'

import { bookCopies, usersRoutes } from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const PORT = 3000;

app.use('/api/users', usersRoutes);
app.use('/api/bookCopies', bookCopies);

app.listen(PORT, () => console.log(`||SERVER||${PORT}`));