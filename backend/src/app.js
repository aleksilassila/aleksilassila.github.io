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
const tweaks = require("./controllers/tweaks");

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

router.get("/posts", posts.getAll); // Get all public posts
router.get("/tweaks", tweaks.getAll); // Get all tweaks

privateRouter.get("/posts/get", posts.getMyPosts);
privateRouter.post("/posts/create", posts.create);
privateRouter.post("/posts/remove", posts.remove);
privateRouter.post("/tweaks/create", tweaks.create);
privateRouter.post("/tweaks/remove", tweaks.remove);
privateRouter.post("/tweaks/update", tweaks.update);

app.use(router.routes()).use(router.allowedMethods());

// Protect routes from now on, jwt can be found in cookie called "token"
app.use(jwt({ secret: config.JWT_SECRET, debug: true, cookie: "token" }));

// Append user object
app.use(async (ctx, next) => {
    const user = await database.User.findOne({
        where: { googleId: ctx.state.user.googleId },
    });

    ctx.state.userObject = user;
    if (!user) {
        ctx.status = 403;
        ctx.body = "User not found.";
        return;
    }
    await next();
});

app.use(privateRouter.routes()).use(privateRouter.allowedMethods());
