DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders(
    id SERIAL PRIMARY KEY NOT NULL,
    store_id INTEGER REFERENCES store(id), 
    product_id INTEGER REFERENCES product(id),
    total INTEGER
);