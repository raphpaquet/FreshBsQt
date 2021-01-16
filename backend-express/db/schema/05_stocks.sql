CREATE TABLE stocks(
  store_id INTEGER REFERENCES store(id), 
  product_id INTEGER REFERENCES product(id)
);