const Koa = require('koa');
const BodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const { router } = require('./router');

const app = new Koa();
const bodyParser = new BodyParser();

const PORT = 5001;

app.use(bodyParser);
app.use(
  cors({
    origin: '*',
    credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Gitlab-Event'], //设置服务器支持的所有头信息字段
  })
);

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}/`);
});

