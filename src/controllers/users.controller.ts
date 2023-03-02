import { pool } from '../database';

export interface User {
    id?: number;
    first_name: string;
    last_name: string;
    email: string;
    address: string;
    status?: string;
}

export const getAllUsers = async (): Promise<User[]> => {
    const { rows } = await pool.query('SELECT * FROM users');
    return rows;
};

export const getUserById = async (id: number): Promise<User | null> => {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return rows[0] || null;
};

export const createUser = async (user: User): Promise<User> => {
    const { first_name, last_name, email, address } = user;
    const { rows } = await pool.query(
        'INSERT INTO users (first_name, last_name, email, address) VALUES ($1, $2, $3, $4) RETURNING *',
        [first_name, last_name, email, address]
    );
    return rows[0];
};

export const updateUser = async (id: number, user: User): Promise<User | null> => {
    const { first_name, last_name, email, address, status } = user;
    const { rows } = await pool.query(
        'UPDATE users SET first_name = $1, last_name = $2, email = $3, address = $4, status = $5 WHERE id = $6 RETURNING *',
        [first_name, last_name, email, address, status, id]
    );
    return rows[0] || null;
};