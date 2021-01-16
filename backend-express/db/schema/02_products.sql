DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE products(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    quantity INTEGER, 
    image URL, 
    price INTEGER, 
    category_id VARCHAR(255) NOT NULL,
    store_id INTEGER REFERENCES store(id)
);