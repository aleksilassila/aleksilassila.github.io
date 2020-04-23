module.exports = {
	JWT_SECRET: "secret",
	ENDPOINT: process.env.ENDPOINT || "http://localhost:9000/api",
	FRONTEND_ENDPOINT: process.env.FRONTEND_ENDPOINT || "http://localhost:3000",
	GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
	DB_URL: process.env.DB_URL || "postgres://post:post@localhost:5432/post",
};
