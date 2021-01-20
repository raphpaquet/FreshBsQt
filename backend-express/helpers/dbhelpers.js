const bcrypt = require('bcrypt')




module.exports = (db) => {
    const getUsers = () => {
        const query = {
            text: 'SELECT * FROM users',
        };
  
        return db
            .query(query)
            .then((result) => result.rows)
            .catch((err) => err);
    };
  
    const getUserByEmail = email => {
  
        const query = {
            text: `SELECT * FROM users WHERE email = $1` ,
            values: [email]
        }
  
        return db
            .query(query)
            .then(result => result.rows[0])
            .catch((err) => err);
    }
  
    const addUser = (firstName, lastName, address, city, phoneNumber, email, password) => {
        const query = {
            text: `INSERT INTO users (first_name, last_name, address, city, phone_number, email, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *` ,
            values: [firstName, lastName, address, city, phoneNumber, email, password]
        }
  
        return db.query(query)
            .then(result => result.rows[0])
            .catch(err => err);
    }
  
    const getProducts = () => {
        const query = {
            text: `SELECT * FROM products`
        }
  
        return db.query(query)
            .then(result => result.rows)
            .catch(err => err);
  
    }
  
    return {
        getUsers,
        getUserByEmail,
        addUser,
        getProducts
    };
  };

