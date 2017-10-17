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
var sqlStr = { 
    select:'select * from newstype', 
    insert:'insert into newstype(newstype_name) values(?)', 
    update:'update newstype set newstype_name = ? where newstype_id = ?',  
    del:'delete from newstype where newstype_id = ?',
};

router.get('/list', function(req, res, next) {

    pool.getConnection(function(err, connection) {
        connection.query(sqlStr.select, function(error, result, fields) {
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

router.post('/add', function(req, res, next) {
    // console.log(req.query.typename)
    // console.log(req.body.typename)
    var typename = req.body.typename;

    if (typename){
        pool.getConnection(function(err, connection) {
            connection.query(sqlStr.insert,[typename], function(error, result, fields) {
                if (result) {
                    result = {
                        state: 'success',
                        msg: '操作成功',
                    };
                }
                responseJSON(res, result);
                connection.release();
            });
        });
    }
});

router.post('/edit', function(req, res, next) {
    var typename = req.body.typename;
    var id = req.body.id;

    if (typename){
        pool.getConnection(function(err, connection) {
            connection.query(sqlStr.update,[typename,id], function(error, result, fields) {
                if (result) {
                    result = {
                        state: 'success',
                        msg: '操作成功',
                    };
                }
                responseJSON(res, result);
                connection.release();
            });
        });
    }
});

router.post('/del', function(req, res, next) {
    var id = req.body.id;

    if (id){
        pool.getConnection(function(err, connection) {
            connection.query(sqlStr.del,[id], function(error, result, fields) {
                if (result) {
                    result = {
                        state: 'success',
                        msg: '操作成功',
                    };
                }
                responseJSON(res, result);
                connection.release();
            });
        });
    }
});

module.exports = router;