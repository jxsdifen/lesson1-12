var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var dbConfig = require('./dbConfig.js');
var pool = mysql.createPool(dbConfig.mysql);
var responseJSON = function(res, ret) {
    if (typeof ret === 'undefined') {
        res.json({ state: 'fail', msg: '操作失败', data: [] });
    } else {
        res.json(ret);
    }
}

router.get('/', function(req, res, next) {

    pool.getConnection(function(err, connection) {
        connection.query('select * from newstype', function(error, result, fields) {
            if (result) {
                result = {
                    state: 'success',
                    msg: '操作成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });

});

module.exports = router;