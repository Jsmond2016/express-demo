const Koa = require('koa');
const Router = require('koa-router');
 
const app = new Koa();
// 访问地址 http://localhost:3000/api/test1
// 访问地址 http://localhost:3000/api/test2
// 其他地址为 404
//所有路由必须加上一个tony父层级，才能被访问
const router = new Router({
  prefix: '/api'
})
 
//实现 '/'、'/koa'两个路由层级
router
    .get('/test1',(ctx,next)=>{
        ctx.body="test1 page";
    })
    .get('/test2',(ctx,next)=>{
        ctx.body="test2 page";
    });
 
app
  .use(router.routes())
  .use(router.allowedMethods());
  
app.listen(3000,()=>{
    console.log('starting at port 3000');
});