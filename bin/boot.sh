#!/bin/bash
# Copyright (c) tracyqiu
# 服务启动脚本
# 运行如下：sh boot.sh [development|test|production]

# 获取环境变量，默认为 development
env=${1-"development"}
echo "启动环境：" $env
echo "booting ..."

pm2 startOrRestart pm2.json --env $env --no-daemon 

if [ $? -eq 0 ]; then
  echo "Congratulations，boot successfully. you can use `pm2 monit` to watch realtime dashboard."
else
  echo "Oh no，boot failed!!!"
fi