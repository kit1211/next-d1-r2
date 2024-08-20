CREATE TABLE product (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price REAL NOT NULL,
    quantity INTEGER NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

INSERT INTO product (name, description, price, quantity) VALUES
('Laptop', 'High performance laptop for professionals', 1200.00, 10),
('Smartphone', 'Latest model smartphone with high-resolution camera', 800.00, 30),
('Headphones', 'Noise cancelling headphones', 150.00, 50);
