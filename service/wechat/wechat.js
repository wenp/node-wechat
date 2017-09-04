/**
 * @ProjectName: wechat
 * @FileName: wechat.js
 * @Author: wenpeng.young@gmail.com
 * @date: 2017-07-27 12:43
 */
'use strict'
const wechat = require('wechat');   // 引入 wechat 模块
const baseMsgUtils = require('./baseMsgUtil');  // 引入 基本消息处理模块
const request = require('request'); // 引入 request 模块
const util = require('util');   // 引入工具包 使用 format 拼接字符串
const accessToken = require('./wechat_config/accessToken.json');  // 引入 accesstoken json 文件
const fs = require('fs');   // 引入 fs 模块
const mysql = require('../db').mysql;


class Wechat {

    constructor (config) {
        this.config = config;   // 保存 config 信息 方便再次调用

        this.wechat = wechat(config.wechat);   // 填写配置 验证微信接口

        this.init = this._init();   // 初始对象

        this.mysql = new mysql();   // 创建 mysql 实例

        this.access_token = accessToken;    // 初始化access

        this._create_menus();   // 创建自定义菜单

    }

    // 初始化基本 消息回复
    _init () {

        for(let key in baseMsgUtils){// 处理不同的所有业务逻辑
            this.wechat[key](baseMsgUtils[key].bind(this))
        }
        return this.wechat.middlewarify();        // 返回处理业务逻辑函数
    }

    // 判断accessToken 是否过期并且过期自动请求
    check_access_time() {
        const nowTime = new Date().getTime();
        const preAccessTokenTime = this.access_token.expires_time;
        if(nowTime < preAccessTokenTime) {
            console.log('本地 token');
            // 更新 对象 access_token 属性 如果没有就创建
            return Promise.resolve(this.access_token);
        }
        console.log('远端 token');
        return this._access_token();
    }

    // 获取 access
    _access_token() {
        var that = this;
        return new Promise((resolve, reject) => {
            request.get(util.format(    // 发送请求
                this.config.apiURL.accessTokenApi,
                this.config.apiDomain,
                this.config.wechat.appid,
                this.config.wechat.appsecret))

                .on('error', err => reject(err))// 监听 error 事件

                .on('data', data => { // 监听 data 事件
                    const access = JSON.parse(data.toString()),
                        time = new Date().getTime(),
                        accessTokenStr = {
                            "access_token": access.access_token,
                            "expires_time": time + access.expires_in * 1000
                        };

                    fs.writeFile(__dirname + '/wechat_config/accessToken.json', JSON.stringify(accessTokenStr)) // 更新 access Token.json 文件

                    that.access_token = accessTokenStr; // 更新 对象 access_token 属性

                    resolve(that.access_token); // 更新 promise 状态
                })
        })
    }

    // 创建菜单
    _create_menus () {

        this.check_access_time() // 获取 token
            .then(() => {
                console.log()
                request.post(util.format(this.config.apiURL.createMenus, this.config.apiDomain, this.access_token.access_token))
                    .json(require('./wechat_config/wechat_menu.json'))
                    .on('error', err => {throw err})
                    .on('data', data => {
                        const dataObj = JSON.parse(data.toString());
                        if(dataObj.errcode !==0){
                            throw dataObj.errmsg;
                        }
                    })
            }, err => {throw err})
        return this;
    }

    // mysql 执行 sql 语句
    query(sql) {
        return this.mysql.query(sql)
    }
}

module.exports = Wechat;
