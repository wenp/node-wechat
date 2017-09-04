/**
 * @ProjectName: wechat
 * @FileName: service.js
 * @Author: wenpeng.young@gmail.com
 * @date: 2017-07-27 12:31
 */
'use strict'

// 添加 代理分发不同端口
const proxy = require('http-proxy');// 代理分发功能暂未实现
const express = require('express');
const config = require('./config/config.json')
const wechat = require('./service/wechat/wechat');
const WenpengApi = require('./service/WenpengApi');
const app = express();

// 微信基础服务
app.use('/wechat', new wechat(config).init);
// api 解决 跨域问题 跨域问题
app.use('/api', function (req, res, next) {
    res.set('Access-Control-Allow-Origin', '*')
    next();
})
app.use('/api',new WenpengApi().router)
app.use('/', express.static('dist'))

app.listen(config.host.port, function () {
    console.log("app runing at " + config.host.port);
});

