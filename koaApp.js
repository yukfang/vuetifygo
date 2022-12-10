const fs = require('fs');
const Koa = require('koa');
const koaApp = new Koa();

// logger
koaApp.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
koaApp.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response
koaApp.use(async (ctx, next) => {
    if (ctx.path === '/') {
        ctx.body = 'Hello World: ' + ctx.path;
    } else {
        ctx.body = 'Hello World: ' + ctx.path;
    }

    next();
})

async function init() {
    console.log("init here ....");
}

module.exports = {
  koaApp,
  init,
};
