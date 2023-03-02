import express from 'express'

import { booksRoutes, bookCopiesRoutes, usersRoutes } from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const PORT = 3000;

app.use('/api/books', booksRoutes);
app.use('/api/bookCopies', bookCopiesRoutes);
app.use('/api/users', usersRoutes);

app.listen(PORT, () => console.log(`||SERVER||${PORT}`));