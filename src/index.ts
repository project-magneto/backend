import express from 'express'
import dotenv from 'dotenv';
dotenv.config();

import {
    booksRoutes,
    bookCopiesRoutes,
    loadsRoutes,
    usersRoutes
} from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/books', booksRoutes);
app.use('/api/bookCopies', bookCopiesRoutes);
app.use('/api/loads', loadsRoutes);
app.use('/api/users', usersRoutes);

app.listen(process.env.APP_PORT, () => console.log(`||SERVER||${process.env.APP_PORT}`));