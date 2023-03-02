import { pool } from '../database';

export interface BookCopy {
    id?: number;
    title: string;
    author: string;
    editorial: string;
    edition: string;
    status?: string;
}

export const getAllBookCopies = async (): Promise<BookCopy[]> => {
    const { rows } = await pool.query('SELECT * FROM book_copies');
    return rows;
};

export const getBookCopyById = async (id: number): Promise<BookCopy | null> => {
    const { rows } = await pool.query('SELECT * FROM book_copies WHERE id = $1', [id]);
    return rows[0] || null;
};

export const createCopyBook = async (bookCopy: BookCopy): Promise<BookCopy> => {
    const { title, author, editorial, edition } = bookCopy;
    const { rows } = await pool.query(
        'INSERT INTO book_copies (title, author, editorial, edition) VALUES ($1, $2, $3, $4) RETURNING *',
        [title, author, editorial, edition]
    );
    return rows[0];
};

export const updateBookCopy = async (id: number, bookCopy: BookCopy): Promise<BookCopy | null> => {
    const { title, author, editorial, edition, status } = bookCopy;
    const { rows } = await pool.query(
        'UPDATE book_copies SET title = $1, author = $2, editorial = $3, edition = $4, status = $5 WHERE id = $6 RETURNING *',
        [title, author, editorial, edition, status, id]
    );
    return rows[0] || null;
};