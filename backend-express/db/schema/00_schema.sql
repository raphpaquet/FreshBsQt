DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS stores CASCADE;
DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE users(
    id SERIAL PRIMARY KEY NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL, 
    city VARCHAR(255) NOT NULL, 
    phone_number VARCHAR(255) NOT NULL, 
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE products(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    quantity INTEGER, 
    image VARCHAR(255) NOT NULL, 
    price FLOAT, 
    category_id VARCHAR(255) NOT NULL,
    store_id INTEGER REFERENCES store(id)
);

CREATE TABLE stores(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL, 
    city VARCHAR(255) NOT NULL, 
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL, 
    coordinates INTEGER
);

CREATE TABLE orders(
    id SERIAL PRIMARY KEY NOT NULL,
    store_id INTEGER REFERENCES store(id), 
    product_id INTEGER REFERENCES product(id),
    total FLOAT
);