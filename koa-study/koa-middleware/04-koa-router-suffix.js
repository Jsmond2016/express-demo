const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();


//实现'/home'、'/page'两个子路由层级，以及各自的两个孙子路由层级

//子路由
let home = new Router();
home
    .get('/',async(ctx)=>{
        ctx.body="Home";
    })
    .get('/one',async(ctx)=>{
        ctx.body="Home one";
    })
    .get('/two',async(ctx)=>{
        ctx.body ='Home two';
    })

let page = new Router();
page
    .get('/',async(ctx)=>{
        ctx.body="Page";
    })
    .get('/one',async(ctx)=>{
        ctx.body="Page one";
    })
    .get('/two',async(ctx)=>{
        ctx.body ='Page two';
    })

//总路由，装载子路由
let router = new Router();
router.use('/home',home.routes(),home.allowedMethods());
router.use('/page',page.routes(),page.allowedMethods());

//加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000,()=>{
    console.log('[demo] server is starting at port 3000');
});