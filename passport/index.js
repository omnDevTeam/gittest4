const local = require('./localStrategy.js');

module.exports = passport => {

    passport.serializeUser((user,done) => {
        console.log('serializeUser 호출됨 index.js에서 유저 표시');
        console.dir(user);
        done(null,user);
    });

    passport.deserializeUser((user, done)=>{
        console.log('deserializeUser 호출됨 index.js에서 유저 표시');
        console.log(user);
        done(null, user);
    });

    local(passport);

};