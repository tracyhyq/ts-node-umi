/*
 * @description: 全局的属性声明
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2019-08-21 16:24:17
 */

import { ExtendableContext } from 'koa';
import { ServerResponse } from "http";
import { IAppLogger } from '@server/middlewares/logger';
import {ServerResponse} from "http";

/**
 * @name: 重新定义koa，将logger加入到Context里面
 * @param {type}
 * @return:
 */

declare module '*.css';

interface ServerResponseWithBody extends ServerResponse {
  body: any;
}

declare module 'koa' {
  interface ExtendableContext {
    logger: IAppLogger;
    // traceId 用于日志追踪
    traceId?: string;
    startTime: number;
    // 用户ID
    userId?: string | number;
    request: ServerResponseWithBody
  }
}

interface IWindow extends Window {
  runtime: 'string'
}

declare var window: IWindow;
