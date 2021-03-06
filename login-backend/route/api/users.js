import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from "../../model/Users.js"
import validateRegisterInput from "../../validation/register.js"
import validateLoginInput from "../../validation/login.js"
import key from '../../config/key.js'


const router = express.Router();

router.post("/register", (req, res) => {
    
    // Form
    const {errors, isValid} = validateRegisterInput(req.body);

    // Check validation

    if (!isValid) {
        return res.status(400).json(errors) 
    }

    User.findOne({ email: req.body.email }).then(data => {
        if (data) {
            return res.status(400).json({email: "Email already exist!"})
        }
    })
    
    // Saving user with request information to database
    const newUser = new User ({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    // Password Hash

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err))
        });
    });

});

router.post("/login", (req,res) => {
    const {errors, isValid} = validateLoginInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }

    const email = req.body.email
    const password = req.body.password

    User.findOne({email : email}).then(user => {
        // Check if email is exist
        if (!user) {
            res.status(404).json({emailnotFound : "This email is not registered, Please create an account"})
        }
        // If the email is exist then check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT payload
                const payload = { id: user.id, name: user.name}
                // Sign token
                jwt.sign(payload, key.secretOrKey, {expiresIn: 31556926}, 
                    (err, token) => {res.json({success: true, 
                        token: "Bearer " + token})})
            } else {
                { return res.status(400).json({passwordincorrect: "Password Incorrect"})}
            }
        })
    })

})

export default router;
