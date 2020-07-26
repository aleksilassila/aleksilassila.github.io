const jwt = require("jsonwebtoken");

const config = require("../config");
const database = require("../database");

// Posts for user who isn't signed in
exports.getPosts = async (ctx) => {
    const token = ctx.cookies.get("token");
    const user = token
        ? jwt.verify(token, config.JWT_SECRET, (err, decoded) =>
              err ? false : decoded
          )
        : false;

    const posts = await database.Post.findAll({
        order: [["createdAt", "DESC"]],
        include: [
            {
                model: database.User,
                as: "creator",
                where: {
                    [database.Op.or]: [
                        { googleId: "101906861221126490500" },
                        user && { googleId: user.googleId },
                    ],
                },
            },
        ],
    });
    ctx.body = posts;
};

// Posts for specific user
exports.getMyPosts = async (ctx) => {
    const posts = await database.Post.findAll({
        include: [
            {
                model: database.User,
                as: "creator",
                where: {
                    googleId: ctx.state.user.googleId,
                },
            },
        ],
    });
    ctx.body = posts;
};

exports.createPost = async (ctx) => {
    if (!(ctx.request.body.title && ctx.request.body.content)) {
        ctx.status = 400;
        return;
    }

    const user = ctx.state.userObject;

    if (user) {
        await database.Post.create({
            title: ctx.request.body.title,
            content: ctx.request.body.content,
            creatorGoogleId: user.googleId,
        }).then(() => {
            ctx.status = 200;
        });
    } else {
        ctx.status = 403;
        return;
    }

    ctx.body = "Post created";
};

exports.removePost = async (ctx) => {
    if (!ctx.request.body.id) {
        ctx.status = 400;
        return;
    } else if (ctx.state.userObject) {
        ctx.status;
    }

    await database.Post.destroy({
        where: {
            id: ctx.request.body.id,
            creatorGoogleId: ctx.state.user.googleId,
        },
    }).then(() => {
        ctx.status = 200;
    });
};
