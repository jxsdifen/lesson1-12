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
    select:'select n.*,nt.newstype_name from news as n,newstype as nt where n.newstype_id=nt.newstype_id order by n.newsid desc', 
    insert:'insert into news(newstitle,newstype_id,newsimg,newsdesc,newsdate) values(?,?,?,?,?)', 
    update:'update news set newstitle = ?,newstype_id = ?,newsimg = ?,newsdesc = ?,newsdate = ? where newsid = ?',  
    del:'delete from news where newsid = ?',
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
    var title = req.body.title,
        type = req.body.type,
        img = req.body.img,
        desc = req.body.desc,
        date = req.body.date;

    pool.getConnection(function(err, connection) {
        connection.query(sqlStr.insert, [title, type, img, desc, date], function(error, result, fields) {
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
    
});

router.post('/edit', function(req, res, next) {
    var title = req.body.title,
        type = req.body.type,
        img = req.body.img,
        desc = req.body.desc,
        date = req.body.date,
        id = req.body.id;

    if (id){
        pool.getConnection(function(err, connection) {
            connection.query(sqlStr.update, [title, type, img, desc, date, id], function(error, result, fields) {
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
            connection.query(sqlStr.del, [id], function(error, result, fields) {
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