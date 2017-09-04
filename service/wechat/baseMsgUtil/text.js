/**
 * @ProjectName: wechat
 * @FileName: text.js
 * @Author: wenpeng.young@gmail.com
 * @date: 2017-07-27 16:11
 */
'use strict'


module.exports = function (message, req, res, next) {
    if(message.Content == "我的头像"){
        this.query(`select headimgurl from user_info where openid=\"${message.FromUserName}\"`)
            .then((data) => {
                res.reply([
                    {
                        title: '沙比',
                        description: '沙比的头像真难看，还不如一条单身汪的',
                        picurl: data[0].headimgurl,
                        url: 'https://www.baidu.com/sf/vsearch?pd=image_content&word=%E5%A4%A7%E8%85%BF%E5%A6%B9%E5%AD%90&tn=vsearch&sa=vs_tab&lid=9586996605714904604&ms=1&from=844b&atn=page'
                    }
                ]);
            }, err => {
                throw err;
            })
        return
    }





    require('../lib/treatTextMsg')(message, this)
        .then(data => {
            resMsg(data, res)
        }, err => {
            throw err;
        })
}
// 图灵机器人返回
function resMsg(data, res) {
    switch (data.code){
        case 100000:
            res.reply({type: "text", content: data.text});
            break;
        default:
            res.reply({type: "text", content: `<a href="${data.url}">${data.text}</a>`});
            break;
    }
}