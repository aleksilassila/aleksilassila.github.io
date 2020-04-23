const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const Router = require("koa-router");

const passport = require("koa-passport");
const jwt = require("koa-jwt");

const database = require("./database");
const config = require("./config");

const auth = require("./controllers/auth");
const posts = require("./controllers/posts");

const app = (module.exports = new Koa());
const router = new Router({ prefix: "/api" });
const privateRouter = new Router({ prefix: "/api" });

// CORS
app.use(cors({ credentials: true }));

app.use(bodyParser());

app.use(passport.initialize());

router.get(
    "/auth/google",
    passport.authenticate("google", { session: false, scope: ["profile"] })
);

router.get(
    "/auth/google/redirect",
    passport.authenticate("google", {
        session: false,
    }),
    auth.redirect
);

router.get("/auth/logout", auth.logout);

router.get("/posts", posts.getPosts);

privateRouter.get("/posts/get", posts.getMyPosts);
privateRouter.post("/posts/create", posts.createPost);
privateRouter.post("/posts/remove", posts.removePost);

app.use(router.routes()).use(router.allowedMethods());

// Protect routes from now on, jwt can be found in cookie called "token"
app.use(jwt({ secret: config.JWT_SECRET, debug: true, cookie: "token" }));

// Append user object
app.use(async (ctx, next) => {
    const user = await database.User.findOne({
        where: { googleId: ctx.state.user.googleId },
    });

    ctx.state.userObject = user;
    await next();
});

app.use(privateRouter.routes()).use(privateRouter.allowedMethods());
