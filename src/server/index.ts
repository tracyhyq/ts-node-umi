/*
 * @description: nodejs 入口，需要引入 module-alias 模块，支持node里面别名引入，参考：
 *   https://dev.to/larswaechter/path-aliases-with-typescript-in-nodejs-4353
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2019-08-23 15:53:13
 */
require('regenerator-runtime/runtime');
import 'module-alias/register';
import server from 'umi-server';
import Koa from 'koa';
import compress from 'koa-compress';
import mount from 'koa-mount';
import koaBody from 'koa-body';
import Router from 'koa-router';
import middlewares from './middlewares';
import apiRouter from './routes';
import getConfig from '@root/config/env';
import { join, extname } from 'path';

const env = process.env.NODE_ENV || 'development';
const isDev = env === 'development';
const config = getConfig(env);
const port = process.env.port || config.port || 3004;

const root = join(__dirname, '../../' + '/dist');
const render = server({
  root,
  polyfill: false,
  dev: isDev,
  stream: true,
});

const app = new Koa();

const router = new Router();

app.use(koaBody());

app.use(
  compress({
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH,
  })
);
// 挂载自定义中间件
middlewares.loadMiddlewares(app);

// 心跳检查，用于运维监控服务异常
router.get('/health', async (ctx: Koa.ExtendableContext, next: Koa.Next) => {
  ctx.body = {
    status: {
      code: 'UP',
      description: 'yes',
    },
  };
});

// 挂载api路由
router.use('/api', apiRouter.routes(), apiRouter.allowedMethods());
app.use(router.routes());

app.on('error', (err: Error, ctx: Koa.ExtendableContext) => {
  console.log(err);
  ctx.logger.error(err);
});

app.use(async (ctx: Koa.ExtendableContext, next: Koa.Next) => {
  const { path } = ctx;
  const ext = extname(ctx.request.path);
  const shouldIgnore = config.ssrProxyIgnore.find((em: string) =>
    path.startsWith(em)
  );

  // 符合要求的路由才进行服务端渲染，否则走静态文件逻辑
  if (!ext && !shouldIgnore) {
    ctx.type = 'text/html';
    ctx.status = 200;
    const { ssrStream } = await render({
      req: {
        url: ctx.request.url,
      },
    });

    ctx.body = ssrStream;
  } else {
    await next();
  }
});

app.use(mount('/dist', require('koa-static')(root)));

if (!process.env.NOW_ZEIT_ENV) {
  app.listen(port);
  console.log(`success listening at port ${port}`);
}

module.exports = app.callback();
