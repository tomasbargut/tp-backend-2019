// const passport = require('passport');
// const {ExtractJwt, Strategy} = require('passport-jwt');
// const {User} = require('../models');

// passport.use(new Strategy({
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
//     secretOrKey: process.env.JWTSECRET
// }, (jwtPayload, done) => {
//     User.findById(jwtPayload.id, (err, user) =>{
//         if( err ){
//             return done(err, false);
//         }
//         if( user ){
//             return done(null, user);
//         }else{
//             return done(null, false);
//         }
//     })
// }))