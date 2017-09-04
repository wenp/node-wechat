/**
 * @ProjectName: wechat
 * @FileName: treatEventMsg.js
 * @Author: wenpeng.young@gmail.com
 * @date: 2017-07-31 10:23
 */
'use strict'

// 处理菜单点击事件
exports.CLICK = (message, that) => {
    let str;
    switch (message.EventKey){
        case "杨保玉":
            str = "this is my Dady, he name is YangBaoyu and He is my hero";
            break;
        case "张振凡":
            str = "this is my Mam, she name is ZhangZhenfan and She lights my life";
            break;
        case "杨芳":
            str = "this is my eldest sister, she name is Yangfang and I wish her a happy life";
            break;
        case "杨欢":
            str = "this is my second sister, she name is Yanghuan and I wish her have a happy life";
            break;
        case "杨娜":
            str = "this is my third sister, she name is Yangna and She lived happily";
            break;
        case "提意见":
            str = "意见功能正在开发中；如果开发完毕， 希望您能提出宝贵的意见 来让我完善我的作品";
            break;
        default :
            str = "功能开发中。敬请期待"
    }
    return str
}

// 处理关注事件
exports.subscribe = (message, that) => {
    // 获取用户信息 储存数据库
    require('./getWechatUserInfo')(message.FromUserName, that);

    return "感谢您的关注，相关功能正在开发。\n 敬请期待 ~~~"
}
exports.unsubscribe = (message, that) => {
    // 获取用户信息 储存数据库
    that.query(`DELETE FROM user_info WHERE openid=\"${message.FromUserName}\";`);

    return "感谢您的关注，相关功能正在开发。\n 敬请期待 ~~~"
}
