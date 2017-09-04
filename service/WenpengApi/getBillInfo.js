/**
 * @ProjectName: wechat
 * @FileName: getBillInfo.js
 * @Author: wenpeng.young@gmail.com
 * @date: 2017-08-01 18:23
 */
'use strict'
const xls = require('node-xlsx');
const path = require('path');

module.exports = {
    url: '/getBillInfo/:year/:month',
    type: 'get',
    response (req, res) {
        const url = path.join(process.cwd(), `service/billData/${req.params.year+'.'+req.params.month}.xls`);
        let parseInfo;
        let billInfo;
        try {
            parseInfo = xls.parse(url);
            billInfo = parseInfo[0].data;
            billInfo.shift();
        } catch (err) {
            res.json({
                success: false,
                msg: err
            });
            return;
        }
        res.json({
            success: true,
            msg: "请求成功",
            data: billInfo
        });

    }
}