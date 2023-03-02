import express, { Request, Response } from 'express';
import Joi from 'joi';
import { 
    Book,
    getAllBooks,
    getBookById,
    createBook,
    updateBook
} from '../controllers/books.controller';

const router = express.Router();

const bookSchema = Joi.object({
    book_copies_id: Joi.number().required(),
    status_book: Joi.string(),
});

router.get('/', async (_req: Request, res: Response) => {
    try {
        const books = await getAllBooks();
        res.status(200).json(books);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            console.log('Unexpected error', err);
        }
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const book = await getBookById(id);
        if (!book) {
            res.status(404).json({ message: `Book with ID ${id} not found` });
        } else {
            res.status(200).json(book);
        }
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            console.log('Unexpected error', err);
        }
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { book_copies_id, status_book } = req.body;

        const { error } = bookSchema.validate({ book_copies_id, status_book });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const newBook: Book = { book_copies_id, status_book };
        const createdBook = await createBook(newBook);
        res.status(201).json(createdBook);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            console.log('Unexpected error', err);
        }
    }
});

router.patch('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { book_copies_id, status_book } = req.body;

        const { error } = bookSchema.validate({ book_copies_id, status_book });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const updatedBook: Book = { book_copies_id, status_book };
        const result = await updateBook(id, updatedBook);
        if (!result) {
            res.status(404).json({ message: `Book with ID ${id} not found` });
        } else {
            res.status(200).json(result);
        }
    } catch (err) {
        if (err instanceof Error) {            
            res.status(500).json({ message: err.message });
        } else {
            console.log('Unexpected error', err);
        }
    }
});

export default router;
