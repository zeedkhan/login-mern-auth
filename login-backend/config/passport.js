// import passport from "passport";
// import JwtStrategy from "passport-jwt"
// import ExtractJwt from "passport-jwt"
// import User from "../model/Users.js"
import keys from "../config/key.js"
import { createRequire } from "module"
import passport from "passport";

const require = createRequire(import.meta.url)
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users")
// const keys = require("../config/key")


const opts = {}
opts.jwtFromRequest = ExtractJwt.fromHeader();
opts.secretOrKey = keys.secretOrKey;

passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload).then(user => {
                if (user) {
                    return done (null, user)
                }
                return done(null, false)
            }).catch(err => console.log(err))
        })
    )
}

export default passport

