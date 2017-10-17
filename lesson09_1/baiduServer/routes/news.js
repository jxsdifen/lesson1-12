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
	var sqlstr = '';
	if (req.query.type){
		sqlstr = 'select n.*,nt.newstype_name from news as n,newstype as nt where n.newstype_id=nt.newstype_id and n.newstype_id='+req.query.type+' order by n.newsid desc';
	}else{
		sqlstr = 'select * from news order by newsid desc';
	}

    pool.getConnection(function(err, connection) {
        connection.query(sqlstr, function(error, result, fields) {
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