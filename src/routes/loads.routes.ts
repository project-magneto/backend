import express, { Request, Response } from 'express';
import Joi from 'joi';
import { 
    Load,
    getAllLoads,
    getLoadById,
    createLoad,
    updateLoad
} from '../controllers/loads.controller';

const router = express.Router();

const loadsSchema = Joi.object({
    books_id: Joi.number().required(),
    users_id: Joi.number().required(),
    date_start: Joi.date(),
    date_finish: Joi.date().required(),
});

router.get('/', async (_req: Request, res: Response) => {
    try {
        const loads = await getAllLoads();
        res.status(200).json(loads);
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
        const load = await getLoadById(id);
        if (!load) {
            res.status(404).json({ message: `Load with ID ${id} not found` });
        } else {
            res.status(200).json(load);
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
        const { books_id, users_id, date_start, date_finish } = req.body;

        const { error } = loadsSchema.validate({ books_id, users_id, date_start, date_finish });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const newLoad: Load = { books_id, users_id, date_start, date_finish };
        const createdLoad = await createLoad(newLoad);
        res.status(201).json(createdLoad);
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
        const { books_id, users_id, date_start, date_finish } = req.body;

        const { error } = loadsSchema.validate({ books_id, users_id, date_start, date_finish });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const updatedLoad: Load = { books_id, users_id, date_start, date_finish };
        const result = await updateLoad(id, updatedLoad);
        if (!result) {
            res.status(404).json({ message: `Load with ID ${id} not found` });
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
