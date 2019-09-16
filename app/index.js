const Koa = require('koa');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const error = require('koa-json-error');
const parameter = require('koa-parameter');
const mongoose = require('mongoose');
const path = require('path');
const app = new Koa();
const routing = require('./routes');
const {connectionStr} = require('./config')

mongoose.connect(connectionStr, { useNewUrlParser: true , useFindAndModify: false, useUnifiedTopology:true}, ()=>console.log('MongoDB连接成功了'));
mongoose.connection.on('error',console.error);

// 设置静态服务
app.use(koaStatic(path.join(__dirname,'public')));
// 处理错误信息
app.use(error({
    //定制返回格式
    postFormat:(e, {stack, ...rest})=>process.env.NODE_ENV === "production" ? rest : {stack, ...rest}
}));
// 处理请求体body
app.use(koaBody({
    multipart: true,//是否支持 multipart-formdate 的表单(文件格式))
    formidable:{//配置更多的关于 multipart 的选项
        uploadDir: path.join(__dirname,'/public/uploads'),//文件上传的文件夹
        keepExtensions: true,//保留原来的文件后缀
    }
}));
//校验参数
app.use(parameter(app));
routing(app);

app.listen(3000,()=>console.log('Server started at localhost:3000'));