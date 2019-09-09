const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const error = require('koa-json-error');
const parameter = require('koa-parameter');
const app = new Koa();
const routing = require('./routes');


// app.use(async (ctx,next)=>{
//     try{
//         await next();
//     }catch(err){
//       ctx.status = err.status || err.statusCode || 500;  
//       ctx.body = {
//           message: err.message
//       }
//     }
// })

app.use(error({
    //定制返回格式
    postFormat:(e, {stack, ...rest})=>process.env.NODE_ENV === "production" ? rest : {stack, ...rest}
}));
app.use(bodyparser());
app.use(parameter(app));
routing(app);

app.listen(3000,()=>console.log('Server started at localhost:3000'));