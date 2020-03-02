/*
 * @description: 基于 axios 的 http 请求封装   详细使用手册：https://www.jianshu.com/p/7a9fbcbb1114
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2019-08-22 14:13:59
 */

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IServerResponse } from '@I/common';
import Cookies from 'js-cookie';
import router from 'umi/router';
import getConfig from '@root/config/env';

// tslint:disable:no-any
// 全局 config  hook
let globalConfig: IConfig = {};

export interface IConfig extends AxiosRequestConfig {
  // 设置 loading 文案
  loadingText?: string;
  // 设置异常时，弹出的 alert 文案
  errorText?: string;
}

/**
 * 统一封装异常类型
 *
 * @export
 * @class ServerError
 * @extends {Error}
 */
export class ServerError extends Error {
  code?: number;
  data?: any;
  msg?: string;

  constructor(option: IServerResponse) {
    super();
    this.code = option.code;
    this.data = option.data;
    this.msg = option.msg;
  }
}

// 默认超时时间 5 秒
const DEFAULT_TIMEOUT = 5000;
// 全局设置默认超时时间
axios.defaults.timeout = DEFAULT_TIMEOUT;
// @ts-ignore
const runtime = process.env.runtime || window.runtime || process.env.NODE_ENV;
const config = getConfig(runtime);
const domain = config.domain;

/**
 * 处理返回数据
 * @param res
 */
// tslint:disable-next-line:no-any
const dealRes = <T>(res: AxiosResponse<any>): T => {
  if (!res) {
    throw { msg: '获取数据失败，请重试' };
  }
  const { code, data } = res.data;
  if (~~code >= 400) {
    throw new ServerError(res.data);
  } else {
    return data as T;
  }
};

export const HttpUtil = {
  get: async <R>(url: string, config: IConfig = {}): Promise<R> => {
    const res = await axios.get(`${domain}${url}`, config);
    return dealRes<R>(res);
  },
  post: async <R>(
    url: string,
    postdata?: any,
    config: IConfig = {}
  ): Promise<R> => {
    const res = await axios.post(`${domain}${url}`, postdata, config);
    return dealRes<R>(res);
  },
  put: async <R>(
    url: string,
    putdata?: any,
    config: IConfig = {}
  ): Promise<R> => {
    const res = await axios.put(`${domain}${url}`, putdata, config);
    return dealRes<R>(res);
  },
  delete: async <R>(url: string, config: IConfig = {}): Promise<R> => {
    const res = await axios.delete(`${domain}${url}`, config);
    return dealRes<R>(res);
  },
};

/**
 * 配置request拦截器，需要做一下几件事：
 * 1、统一业务 header，用于跨域
 * 2、接口返回401、403时，跳转到登录页面
 * 3、弹出loading层
 */
axios.interceptors.request.use(
  (config: IConfig) => {
    globalConfig = config;
    // 业务统一 header
    config.headers = Object.assign(
      {},
      {
        loginToken: Cookies.get('token-for-cors') || '',
      },
      config.headers
    );
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    if (
      response &&
      response.data &&
      (String(response.data.code) === '401' ||
        String(response.data.code) === '403')
    ) {
      router.push('/exception/403');
      // eg: window.href.location = 'login.html';
    }
    return response;
  },
  (error) => {
    if (globalConfig && globalConfig.errorText) {
      globalConfig = {};
    }
    return Promise.reject(error);
  }
);
