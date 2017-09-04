/**
 * @ProjectName: wechat
 * @FileName: treatTextMsg.js
 * @Author: wenpeng.young@gmail.com
 * @date: 2017-07-31 10:21
 */
'use strict'

const request = require('request'); // 引入 request 模块

module.exports =  (message, that) => {
    require('./getWechatUserInfo')(message.FromUserName, that);
    return new Promise((resolve, reject) => {
        // 图灵机器人聊天
        request.post(that.config.tuling.domain)
            .json({
                "key": that.config.tuling.key,
                "info": message.Content,
                "userid": message.FromUserName
            })
            .on('error', err => reject(err))
            .on('data', data => resolve(JSON.parse(data.toString())))
    })



}