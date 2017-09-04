/**
 * @ProjectName: wechat
 * @FileName: getWechatUserInfo.js
 * @Author: wenpeng.young@gmail.com
 * @date: 2017-07-31 10:28
 */
'use strict'
const request = require('request');
const util = require('util');

module.exports = (openid, that) => {
    that.check_access_time()
        .then(() => {
            const url = util.format(
                that.config.apiURL.userInfo,
                that.config.apiDomain,
                that.access_token.access_token,
                openid
            )
            return new Promise((resolve, reject) => {
                request.get(url)
                    .on('error', err => reject(err))
                    .on('data', data => resolve(data))
            })
        }, err => {
            throw err
        })
        .then(data => {
            let dataObj = JSON.parse(data);
            dataObj.tagid_list = dataObj.tagid_list.join(',');
            const str = Object.keys(dataObj).join(',')
            // 语句顺序
            const insert_str = `insert into user_info (id, ${str}) values(null,${dataObj.subscribe},\"${dataObj.openid}\",\"${dataObj.nickname}\",${dataObj.sex},\"${dataObj.language || ''}\",\"${dataObj.city || ''}\",\"${dataObj.province || ''}\",\"${dataObj.country || ''}\",\"${dataObj.headimgurl || ''}\",\"${dataObj.subscribe_time}\",\"${dataObj.remark || ''}\",\"${dataObj.groupid || ''}\",\"${dataObj.tagid_list || ''}\");`;
            // 运行 insert 语句
            that.query(insert_str)
                .then(data => {
                    console.log(data);
                }, err => {
                    throw err;
                });

        }, err => {
            throw err;
        })


}