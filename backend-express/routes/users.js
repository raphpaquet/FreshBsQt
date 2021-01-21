const express = require('express');
const router = express.Router();
const {
    getPostsByUsers
} = require('../helpers/dataHelpers');

module.exports = ({
    getUsers,
    getUserByEmail,
    addUser, 
    userLogin
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

    // login route
    router.post('/login', (req, res) =>{
        const {
            email, 
            password
    } = req.body;
        console.log(`login info: ${email} ${password}`)
        userLogin(email, password)
            .then(user => {
               console.log("user:", user)
               if (user) {
                res.send('This user is in the DB')
            } else {
                res.send('No user with this login information')
            }
            })
    })

    router.post('logout', (req, res) => {
        console.log("logging out", req.session.user_id )
        console.log(req.session.user_id)
        delete req.session.user_id
        console.log(req.session.user_id)
        // res.clearCookie("session"); /// res.cookies can erase a cooking by refering only to it's name
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
                    console.log("if user is found", user)
                    res.json({
                        msg: 'Sorry, a user account with this email already exists'
                    });
                } else {
                    return addUser(first_name, last_name, email, password, phone_number, address, city)
                }

            })
            .then(newUser => {
                console.log("look here", newUser)
              req.session.user_id = newUser.id 
              res.cookie("potatoe", newUser.id)
              res.json(newUser)
            })
                
            .catch(err => res.json({
                error: err.message
            }));

    })

    return router;
};