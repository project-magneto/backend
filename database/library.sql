CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(40),
    last_name VARCHAR(40),
    email TEXT NOT NULL UNIQUE,
    address TEXT,
    status BOOLEAN DEFAULT 'true'
);

INSERT INTO users (first_name, last_name, email, address, status)
    VALUES
    ('Casi','Feldhuhn','cfeldhuhn0@java.com','15th Floor',true),
    ('Kevan','Leggitt','kleggitt1@statcounter.com','Suite 83',false),
    ('Max','Gilardoni','mgilardoni2@paypal.com','PO Box 13547',false),
    ('Adi','Bottini','abottini3@arstechnica.com"','PO Box 73851',true),
    ('Tobiah','Brosius','tbrosius4@statcounter.com','Suite 25',true),
    ('Bondie','Choffin','bchoffin5@stanford.edu','20th Floor',true),
    ('Mohammed','Saines','msaines6@virginia.edu','Suite 49',true),
    ('Lock','Setford','lsetford7@angelfire.com','16th Floor',true),
    ('Brewer','Le Grice','email":"blegrice8@mysql.com','PO Box 5303',true),
    ('Mil','O Mullen','momullen9@opera.com','Apt 1137',false);

CREATE TABLE book_copies(
    id SERIAL PRIMARY KEY,
    title VARCHAR(40) NOT NULL,
    author VARCHAR(40) NOT NULL,
    editorial VARCHAR(40) NOT NULL,
    edition VARCHAR(40) NOT NULL,
    status BOOLEAN DEFAULT 'true'
);

INSERT INTO book_copies (title, author, editorial, edition, status)
    VALUES
    ('Caramel (Sukkar banat)','Rudyard Fibbitts','Ciconia episcopus','Opana',true),
    ('Full Monty, The','Tilda Agiolfinger','Ratufa indica','THAYERS TOPICAL PAIN RELIEVER SUPERHAZEL',false),
    ('Your Friend the Rat','Avie Eberle','Nasua nasua','IVA XANTHIFOLIA POLLEN',false),
    ('Leatherheads','Kaspar Cartmel','Ratufa indica','Salex',true),
    ('Body Fat Index of Love','Betti Edlington','Haematopus ater','DOLICHOS PRURIENS',true);

CREATE TABLE books(
    id SERIAL PRIMARY KEY,
    book_copies_id INT NOT NULL,
    status_book VARCHAR(40) DEFAULT 'available'
);

ALTER TABLE ONLY books
    ADD CONSTRAINT books_copies_fk FOREIGN KEY (book_copies_id) REFERENCES books(id);

INSERT INTO books (book_copies_id, status_book)
    VALUES
    (1, 'loaded'),
    (1, 'available'),
    (2, 'disabled'),
    (3, 'available'),
    (4, 'available');

CREATE TABLE loads(
    id SERIAL PRIMARY KEY,
    books_id INT NOT NULL,
    users_id INT NOT NULL,
    date_start TIMESTAMP NOT NULL DEFAULT NOW(),
    date_finish TIMESTAMP NOT NULL
);

ALTER TABLE ONLY loads
    ADD CONSTRAINT loads_book_fk FOREIGN KEY (books_id) REFERENCES books(id);

ALTER TABLE ONLY loads
ADD CONSTRAINT loads_users_fk FOREIGN KEY (users_id) REFERENCES users(id);

INSERT INTO loads (books_id, users_id, date_finish)
    VALUES
    (1, 5, NOW()),
    (1, 2, NOW()),
    (2, 1, NOW()),
    (3, 1, NOW()),
    (4, 4, NOW());

