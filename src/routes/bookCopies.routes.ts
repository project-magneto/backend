import express, { Request, Response } from 'express';
import Joi from 'joi';
import { 
    BookCopy,
    getAllBookCopies,
    getBookCopyById,
    createCopyBook,
    updateBookCopy
} from '../controllers/bookCopies.controller';

const router = express.Router();

const bookCopiesSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    editorial: Joi.string().required(),
    edition: Joi.string().required(),
    status: Joi.boolean(),
});

router.get('/', async (_req: Request, res: Response) => {
    try {
        const bookCopies = await getAllBookCopies();
        res.status(200).json(bookCopies);
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
        const bookCopy = await getBookCopyById(id);
        if (!bookCopy) {
            res.status(404).json({ message: `Book copy with ID ${id} not found` });
        } else {
            res.status(200).json(bookCopy);
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
        const { title, author, editorial, edition, status } = req.body;

        const { error } = bookCopiesSchema.validate({ title, author, editorial, edition, status });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const newCopyBook: BookCopy = { title, author, editorial, edition, status };
        const createdBookCopy = await createCopyBook(newCopyBook);
        res.status(201).json(createdBookCopy);
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
        const { title, author, editorial, edition, status } = req.body;

        const { error } = bookCopiesSchema.validate({ title, author, editorial, edition, status });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const updatedBookCopy: BookCopy = { title, author, editorial, edition, status };
        const result = await updateBookCopy(id, updatedBookCopy);
        if (!result) {
            res.status(404).json({ message: `Book copy with ID ${id} not found` });
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
