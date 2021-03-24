"use strict";

// https://github.com/venables/koa-helmet
// 主要针对 https 请求做处理

const Koa = require("koa");
const helmet = require("koa-helmet");
const app = new Koa();

app.use(helmet());

app.use((ctx) => {
  ctx.body = "Hello World"
});

app.listen(3000);