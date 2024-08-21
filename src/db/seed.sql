CREATE TABLE product (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price REAL NOT NULL,
    quantity INTEGER NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE image_info (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    bucket TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);



INSERT INTO product (name, description, price, quantity) VALUES
('Laptop', 'High performance laptop for professionals', 1200.00, 10),
('Smartphone', 'Latest model smartphone with high-resolution camera', 800.00, 30),
('Headphones', 'Noise cancelling headphones', 150.00, 50);



INSERT INTO users (username, password) VALUES
('jtest', '$2a$12$J0TrSnqMA7XxuSaSblq5be1VVQKffBdlpN5JOc7WKIHt6SGwXi2QS');
