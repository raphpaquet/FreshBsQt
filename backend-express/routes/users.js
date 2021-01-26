const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {
    getPostsByUsers,
} = require('../helpers/dataHelpers');




module.exports = ({
    getUsers,
    getUserByEmail,
    addUser, 
    userLogin,
    getUserById
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

        // // login route
        router.post('/login', (req, res) =>{
            const {
                email, 
                password
        } = req.body;
            userLogin(email, password)
                .then(user => {
                   if (user) {
                    req.session.user_id = user.id
                    res.json(user)
                } else {
                    res.send('No user with this login information')
                }
                })
        })

    router.post('/logout', (req, res) => {
        console.log("logging out", req.session.user_id )
        delete req.session.user_id
        res.send("ok");  
    })

    router.post('/register', (req, res) => {

        const {
            first_name,
            last_name,
            email,
            password,

            phone_number, 
            address, 
            city
        } = req.body;

        getUserByEmail(email)

            .then(user => {

                if (user) {
                    res.json({
                        msg: 'Sorry, a user account with this email already exists'
                    });
                } else {

                    return addUser(first_name, last_name, email, password, phone_number, address, city)
                }

            })
            .then(newUser => {
              req.session.user_id = newUser.id 
              res.json(newUser)
            })
                
            .catch(err => res.json({
                error: err.message
            }));

    })



    router.post('/auth', (req, res) => {
        if(req.sessions.user_id) {
            return getUserById(req.sessions.user_id)
        } else {
            return null
        } 
    });

   
    return router;
};