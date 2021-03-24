const Koa = require('koa');
const Router = require('koa-router');
 
const app = new Koa();
const router = new Router();
 
//实现 '/'、'/koa'两个路由层级
router
    .get('/',(ctx,next)=>{
        ctx.body="Index page";
    })
    .get('/koa',(ctx,next)=>{
        ctx.body="Koa page";
    });
 
app
  .use(router.routes())
  .use(router.allowedMethods());
  
app.listen(3000,()=>{
    console.log('starting at port 3000');
});