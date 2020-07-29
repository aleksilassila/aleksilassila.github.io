const jwt = require("jsonwebtoken");

const config = require("../config");
const database = require("../database");

// All public posts
exports.getAll = async (ctx) => {
    const tweaks = await database.Tweak.findAll({
        order: [["createdAt", "DESC"]],
    });
    ctx.body = tweaks;
};

exports.create = async (ctx) => {
    const user = ctx.state.userObject;

    if (!(ctx.request.body.name && ctx.request.body.description)) {
        ctx.status = 400;
        return;
    }

    if (user.admin === false) {
        ctx.status = 401;
        return;
    }

    await database.Tweak.create({
        name: ctx.request.body.name,
        description: ctx.request.body.description,
    }).then(() => {
        ctx.status = 200;
    });

    ctx.body = "Tweak created";
};

exports.remove = async (ctx) => {
    const user = ctx.state.userObject;

    if (!ctx.request.body.id) {
        ctx.status = 400;
        return;
    } else if (user.admin === false) {
        ctx.status = 401;
        return;
    }

    await database.Tweak.destroy({
        where: {
            id: ctx.request.body.id,
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
        !ctx.request.body.name ||
        !ctx.request.body.description
    ) {
        ctx.status = 400;
        return;
    } else if (user.admin === false) {
        ctx.status = 401;
        return;
    }

    const tweak = await database.Tweak.findOne({
        where: {
            id: ctx.request.body.id,
        },
    });

    if (tweak) {
        tweak.name = ctx.request.body.name;
        tweak.description = ctx.request.body.description;
        await tweak.save();
        ctx.status = 200;
    } else {
        ctx.status = 400;
        ctx.body = "No tweak found.";
    }
};
