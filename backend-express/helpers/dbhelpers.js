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

    const userLogin = (email, password) =>{
        const query = {
            text: `SELECT * FROM users WHERE email = $1 AND password = $2` , 
            values: [email, password]
        }
        return db
            .query(query)
            .then(result => {
                console.log("This is RESULTS.row:",result.rows[0] )
                result.rows[0]
                })
            .catch((err) => err);
    }
  
    const addUser = (firstName, lastName, email, password, phone_number, address, city) => {
        const query = {
            text: `INSERT INTO users (first_name, last_name, email, password, phone_number, address, city) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *` ,
            values: [firstName, lastName, email, password, phone_number, address, city]
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
  
    console.log(addUser)
    return {
        getUsers,
        getUserByEmail,
        addUser,
        userLogin, 
        getProducts
    };
  };

