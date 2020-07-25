const passport = require("koa-passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const database = require("../database");

const config = require("../config");

passport.use(
    new GoogleStrategy(
        {
            // options for google strategy
            clientID: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://aleksilassila.me/api/auth/google/redirect",
        },
        async (accessToken, refreshToken, profile, done) => {
            await database.User.findOrCreate({
                where: {
                    googleId: profile.id,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                },
            }).then(done(null, profile.id));
        }
    )
);

exports.returnJWT = (user) => {
    return jwt.sign({ googleId: user }, config.JWT_SECRET, { expiresIn: "2d" });
};

exports.verifyJWT = (jwt) => {
    return jwt.verify(jwt, config.JWT_SECRET);
};

exports.logout = async (ctx) => {
    ctx.cookies.set("token", "");
    ctx.redirect(config.FRONTEND_ENDPOINT);
};

exports.redirect = async (ctx) => {
    ctx.cookies.set("token", this.returnJWT(ctx.state.user));
    ctx.redirect(config.FRONTEND_ENDPOINT + "/posts");
    // ctx.set("Content-Type", "text/html");
    // ctx.body = "<script>window.close()</script>";
};
