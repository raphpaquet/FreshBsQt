const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {
    getPostsByUsers,
} = require('../helpers/dataHelpers');




module.exports = ({
    getUsers,
    getUserByEmail,
    addUser
}) => {
    /* GET users listing. */
    router.get('/', (req, res) => {
        getUsers()
            .then((users) => res.json(users))
            .catch((err) => res.json({
                error: err.message
            }));
    });

    router.get('/posts', (req, res) => {
        getUsersPosts()
            .then((usersPosts) => {
                const formattedPosts = getPostsByUsers(usersPosts);
                res.json(formattedPosts);
            })
            .catch((err) => res.json({
                error: err.message
            }));
    });

    router.post('/', (req, res) => {

        const {
            first_name,
            last_name,
            email,
            password,
            address,
            city,
            phoneNumber
        } = req.body;

        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        const userEmail = req.body.email.toLowerCase();

        getUserByEmail(userEmail)
            .then(user => {

                if (user) {
                    res.json({
                        msg: 'Sorry, a user account with this email already exists'
                    });
                } else {
                    return addUser(first_name, last_name, email, password, address, city, phoneNumber)
                }

            })
            .then(newUser => res.json(newUser))
            .catch(err => res.json({
                error: err.message
            }));

    })



 

   
    return router;
};