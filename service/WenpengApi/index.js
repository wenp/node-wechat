/**
 * @ProjectName: wechat
 * @FileName: index.js
 * @Author: wenpeng.young@gmail.com
 * @date: 2017-08-01 18:16
 */
'use strict'

const router = require('express').Router();
const baseMsgUtils = require('require-directory');

 class WenpengApi{
    constructor() {
        this.router = router;
        this.allApi = baseMsgUtils(module);
        this.billData = {};
        this._init();
    }
    _init() {
        for(let item in this.allApi){
            let apiObj = this.allApi[item];
            this.router[apiObj.type](apiObj.url, apiObj.response.bind(this))
        }
    }
}

module.exports = WenpengApi
