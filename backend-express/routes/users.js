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

    // router.post('/register', (req,res) => {
    //     const {
    //         firstName,
    //         lastName,
    //         email,
    //         password,
    //         address,
    //         city,
    //         phoneNumber
    //     } = req.body;

    //     const user = req.body
    //     const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    //     const userEmail = req.body.email.toLowerCase();

    //     getUserByEmail(userEmail)
    //     .then(res => {
    //         if(res) {
    //             res.status(400).json({
    //                 status:"error",
    //                 message: "User's email already exist"
    //             });
    //         } else {
    //             addUser(user)
    //             .then(user => {
    //                 if (!user) {
    //                 res.status(400).json({
    //                     status: 'error',
    //                     message: "empty response lol"
    //                 })
    //             }
    //             currentUser = user
    //             req.session.user_id = user.user_id
    //             return res.send(user)
    //             })
    //         }
    //     })
    //     .catch(error => {
    //         return res.send(error)
    //     })
    // })

    app.post('/register', (req, res) => {
        const {
            firstName,
            lastName,
            email,
            password,
            address,
            city,
            phoneNumber
        } = req.body;

        const userData = req.body
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        const userEmail = req.body.email.toLowerCase();

        getUserByEmail(userEmail)
        .then((response) => {
            if(!response) {
                return addUser(userData)
                .then(user => {
                    req.session.user_id = result.rows[0].id;
                    res.redirect('/')
                    return result.rows[0]
                })
            } else {
                res.redirect('/register')
            }
        })
    })

   
    return router;
};