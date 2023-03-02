import { pool } from '../database';

export interface Book {
    id?: number;
    book_copies_id: number;
    status_book?: string;
}

export const getAllBooks = async (): Promise<Book[]> => {
    const { rows } = await pool.query('SELECT books.id, books.status_book, book_copies.title, book_copies.author, book_copies.editorial, book_copies.edition FROM books JOIN book_copies ON book_copies_id = book_copies.id');
    return rows;
};

export const getBookById = async (id: number): Promise<Book | null> => {
    const { rows } = await pool.query('SELECT books.id, books.status_book, book_copies.title, book_copies.author, book_copies.editorial, book_copies.edition FROM books JOIN book_copies ON book_copies_id = book_copies.id WHERE books.id = $1', [id]);
    return rows[0] || null;
};

export const createBook = async (book: Book): Promise<Book> => {
    const { book_copies_id, status_book } = book;
    const { rows } = await pool.query(
        'INSERT INTO books (book_copies_id, status_book) VALUES ($1, $2) RETURNING *',
        [book_copies_id, status_book]
    );
    return rows[0];
};

export const updateBook = async (id: number, book: Book): Promise<Book | null> => {
    const { book_copies_id, status_book } = book;
    const { rows } = await pool.query(
        'UPDATE books SET book_copies_id = $1, status_book = $2 WHERE id = $3 RETURNING *',
        [book_copies_id, status_book, id]
    );
    return rows[0] || null;
};