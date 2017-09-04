/**
 * @ProjectName: wechat
 * @FileName: mysql.js
 * @Author: wenpeng.young@gmail.com
 * @date: 2017-07-28 15:42
 */
'use strict'
const mysql = require('mysql');
const path = require('path');
const mysql_config = require(path.join(process.cwd(), '/config/config.json')).mysql

class Mysql_calss {
    constructor () {
        this.config = mysql_config
        // 创建 sql 连接池
        this.poll = mysql.createPool(this.config);
    }
    query(sql) {
        return new Promise((resolve, reject) => {
            this.poll.getConnection(function(err,connection){
                if(err) reject(err);
                connection.query(sql,function(error, results, fields){
                    //释放连接
                    connection.release();
                    //事件驱动回调
                    if(error) reject(error);
                    resolve(results);
                });
            });
        })
    }
}

module.exports = Mysql_calss;
