const jwt = require("jsonwebtoken");

const config = require("../config");
const database = require("../database");

// All public posts
exports.getAll = async (ctx) => {
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
        order: [["createdAt", "DESC"]],
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

exports.create = async (ctx) => {
    if (!(ctx.request.body.title && ctx.request.body.content)) {
        ctx.status = 400;
        return;
    }

    const user = ctx.state.userObject;

    await database.Post.create({
        title: ctx.request.body.title,
        content: ctx.request.body.content,
        creatorGoogleId: user.googleId,
    }).then(() => {
        ctx.status = 200;
    });

    ctx.body = "Post created";
};

exports.remove = async (ctx) => {
    if (!ctx.request.body.id) {
        ctx.status = 400;
        return;
    }

    await database.Post.destroy({
        where: {
            id: ctx.request.body.id,
            creatorGoogleId: ctx.state.user.googleId,
        },
    }).then((success) => {
        if (success) {
            ctx.status = 200;
        } else {
            ctx.status = 401;
        }
    });
};

exports.update = async (ctx) => {
    const user = ctx.state.userObject;

    if (
        !ctx.request.body.id ||
        !ctx.request.body.title ||
        !ctx.request.body.content
    ) {
        ctx.status = 400;
        return;
    }

    const post = await database.Post.findOne({
        where: {
            id: ctx.request.body.id,
        },
    });

    if (post) {
        post.title = ctx.request.body.title;
        post.content = ctx.request.body.content;
        await post.save();
        ctx.status = 200;
    } else {
        ctx.status = 400;
        ctx.body = "No post found.";
    }
};
