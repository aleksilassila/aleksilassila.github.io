# aleksilassila.github.io

My homepage, featuring "blog" posts, tweaks and google oauth login to administration page. Built with Next.js and Koa.

## Screenshots

![Homepage](/screenshots/screenshot-home.png?raw=true)
![Admin page](/screenshots/screenshot-admin.png?raw=true)

## .env file for development

```
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

## .env file for production

```
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
ENDPOINT=http://aleksilassila.me/api
FRONTEND_ENDPOINT=http://aleksilassila.me
```

## Backend development environment

`source .env`
`brew services run postgresql`
