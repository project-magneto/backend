import { pool } from '../database';

export interface Load {
    id?: number;
    books_id: number;
    users_id: number;
    date_start?: Date;
    date_finish: Date;
}

export const getAllLoads = async (): Promise<Load[]> => {
    const { rows } = await pool.query('SELECT loads.id, loads.date_start, loads.date_finish, loads.books_id, loads.users_id, users.first_name, users.last_name, users.email FROM loads JOIN users ON users_id = users.id');
    return rows;
};

export const getLoadById = async (id: number): Promise<Load | null> => {
    const { rows } = await pool.query('SELECT loads.id, loads.date_start, loads.date_finish, loads.books_id, loads.users_id, users.first_name, users.last_name, users.email FROM loads JOIN users ON users_id = users.id WHERE loads.id = $1', [id]);
    return rows[0] || null;
};

export const createLoad = async (load: Load): Promise<Load> => {
    const { books_id, users_id, date_start, date_finish } = load;
    const { rows } = await pool.query(
        'INSERT INTO loads (books_id, users_id, date_start, date_finish) VALUES ($1, $2, $3, $4) RETURNING *',
        [books_id, users_id, date_start, date_finish]
    );
    return rows[0];
};

export const updateLoad = async (id: number, load: Load): Promise<Load | null> => {
    const { books_id, users_id, date_start, date_finish } = load;
    const { rows } = await pool.query(
        'UPDATE loads SET books_id = $1, users_id = $2, date_start = $3, date_finish = $4 WHERE id = $5 RETURNING *',
        [books_id, users_id, date_start, date_finish, id]
    );
    return rows[0] || null;
};