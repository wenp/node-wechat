/**
 * @ProjectName: wechat
 * @FileName: event.js
 * @Author: wenpeng.young@gmail.com
 * @date: 2017-07-28 15:15
 */
'use strict'

module.exports = function (message, req, res, next) {
    let str;
    switch (message.Event) {
        case "CLICK":
            str = require('../lib/treatEventMsg').CLICK(message, this);
            break;
        case "subscribe":
            str = require('../lib/treatEventMsg').subscribe(message, this);
            break;
        case "unsubscribe":
            str = require('../lib/treatEventMsg').unsubscribe(message, this);
            break;
    }
    res.reply(str);


}
