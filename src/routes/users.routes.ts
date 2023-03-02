import express, { Request, Response } from 'express';
import Joi from 'joi';
import { User,
    getAllUsers,
    getUserById,
    createUser,
    updateUser
} from '../controllers/users.controller';

const router = express.Router();

const userSchema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    address: Joi.string().required(),
    status: Joi.boolean(),
});

router.get('/', async (_req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
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
        const user = await getUserById(id);
        if (!user) {
            res.status(404).json({ message: `User with ID ${id} not found` });
        } else {
            res.status(200).json(user);
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
        const { first_name, last_name, email, address, status } = req.body;

        const { error } = userSchema.validate({ first_name, last_name, email, address, status });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const newUser: User = { first_name, last_name, email, address, status };
        const createdUser = await createUser(newUser);
        res.status(201).json(createdUser);
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
        const { first_name, last_name, email, address, status } = req.body;

        const { error } = userSchema.validate({ first_name, last_name, email, address, status });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const updatedUser: User = { first_name, last_name, email, address, status };
        const result = await updateUser(id, updatedUser);
        if (!result) {
            res.status(404).json({ message: `User with ID ${id} not found` });
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
