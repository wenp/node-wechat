/**
 * @ProjectName: wechat
 * @FileName: getBillInfo.js
 * @Author: wenpeng.young@gmail.com
 * @date: 2017-08-01 18:23
 */
'use strict'
const path = require('path');
const fs = require('fs');

module.exports = {
    url: '/getBilltotal',
    type: 'get',
    response (req, res) {
        const dirs = fs.readdirSync(path.join(process.cwd(), `service/billData`));
        const dirArr = dirs.map(function (v) {
            return v.slice(0, -4)
        })
        res.json({
            success: true,
            msg: "请求成功",
            data: dirArr
        });

    }
}