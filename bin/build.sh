#!/bin/bash
# Copyright (c) tracyqiu
# 代码编译脚本
# 运行如下：sh deploy.sh [development|test|production]

echo "starting deploy project ..."
# 获取环境变量，默认为 development
env=${1-"development"}
echo "部署环境：" $env
echo "code building ..."

# 编译之前，首先删除上一次的编译模版
echo "deleting dist ..."
rm -rf dist
echo "delete done"

# 编译前端代码
if [ $env == "production" ]; then
  npm run build:client:prod
elif [ $env == "test" ]; then
  npm run build:client:test
else
  npm run build:client:dev
fi

# 编译后端代码
npm run build:server

if [ $? -eq 0 ]; then
  echo "Congratulations，code build successfully～"
else
  echo "Oh no, build faild!!!"
fi