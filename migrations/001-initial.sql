-- Up
CREATE TABLE User (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fName TEXT,
    lName TEXT,
    email TEXT UNIQUE,
    password TEXT,
    created TEXT
);

CREATE TABLE Product (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    image TEXT,
    stock INTEGER,
    price INTEGER,
    created TEXT,
    category TEXT
);

CREATE TABLE CartItem (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uid INTEGER REFERENCES User(id),
    pid INTEGER REFERENCES Product(id),
    quantity INTEGER
);

INSERT INTO Product (name, description, image, stock, price, created, category) VALUES ('Iphone X Gray', 'Iphone X description', '/images/iphone.png', 10, 100000, '3/21/2022', 'phone');
INSERT INTO Product (name, description, image, stock, price, created, category) VALUES ('Iphone X Black', 'Iphone X description', '/images/iphone.png', 10, 120000, '3/21/2022', 'phone');
INSERT INTO Product (name, description, image, stock, price, created, category) VALUES ('Iphone X Green', 'Iphone X description', '/images/iphone.png', 10, 130000, '3/21/2022', 'phone');
INSERT INTO Product (name, description, image, stock, price, created, category) VALUES ('Macbook Air 2022', 'Macbook Air description', '/images/macbook.png', 10, 100000, '3/22/2022', 'laptop');
INSERT INTO Product (name, description, image, stock, price, created, category) VALUES ('Iphone XI', 'Iphone XI description', '/images/iphone.png', 10, 100000, '3/22/2022', 'phone');
INSERT INTO Product (name, description, image, stock, price, created, category) VALUES ('Macbook Air 2022', 'Macbook Air description', '/images/macbook.png', 10, 90000, '3/22/2022', 'tablet');
INSERT INTO CartItem (uid, pid, quantity) VALUES (1, 1, 1);
INSERT INTO CartItem (uid, pid, quantity) VALUES (1, 2, 3);

-- Down
DROP TABLE User;
DROP TABLE Product;
DROP TABLE CartItem;
