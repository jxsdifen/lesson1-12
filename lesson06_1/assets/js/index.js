(function(){
    var param1="",param2="",oper="";
    var saveNum = 0;

    var tb_result = document.getElementById("tb_result");
    var span_save = document.getElementById("span_save");

    // =========存储start
	//存储
	cmm.addClickFun("btn_save",function(){
        var num = parseFloat(tb_result.value);
        if (num!=0){
            saveNum = num;
            span_save.style.display = "block";
        }
    })
    //取存
	cmm.addClickFun("btn_getSave",function(){
        if (saveNum!=0){
            tb_result.value = saveNum;
        }
    })
    //累存
	cmm.addClickFun("btn_addSave",function(){
        var num = parseFloat(tb_result.value);
        if (num!=0){
            saveNum += num;
            span_save.style.display = "block";
        }
    })
    //积存
	cmm.addClickFun("btn_minusSave",function(){
        var num = parseFloat(tb_result.value);
        if (num!=0 && saveNum!=0){
            saveNum =saveNum * num;
            span_save.style.display = "block";
        }
    })
    //清存
	cmm.addClickFun("btn_clearSave",function(){
        saveNum = 0;
        span_save.style.display = "none";
    })
    // =========存储end


	//按数字
	//ie8不支持getElementsByClassName，做处理
	var num_list = cmm.getClassList("num");
	for (var i = 0;i<num_list.length;i++){
		cmm.addClickFun(num_list[i],function(e){
			var select_num = cmm.getTarget(e).getAttribute("num");
			
			if (tb_result.value == "0"){
				tb_result.value = select_num;
			}else{
				tb_result.value += select_num;
			}
		})
	}

    //小数字
    cmm.addClickFun("btn_decimal",function(e){
        var num = tb_result.value;
        if (num.indexOf(".")<0){
            num = num+".";
            tb_result.value = num;
        }
    })
	
    //删除一位
	cmm.addClickFun("btn_del",function(e){
        var num = tb_result.value;
        if (num.length>1){
            num = num.substr(0,num.length-1);
        }else{
            num = 0;
        }
        tb_result.value = num;
    })

    //清屏
	cmm.addClickFun("btn_clear",function(e){
        tb_result.value = 0;
    })

    //全清
	cmm.addClickFun("btn_allClear",function(e){
        document.getElementById("btn_clearSave").click();
        document.getElementById("btn_clear").click();
    })

    //正负值
	cmm.addClickFun("btn_or",function(e){
        var num = parseFloat(tb_result.value);
        if (num!= 0){
            tb_result.value = -num;
        }
    })

    //倒数
	cmm.addClickFun("btn_reciprocal",function(e){
        var num = parseFloat(tb_result.value);
        if (num==0){
            alert("正无穷");
        }else{
            num = 1/num;
            tb_result.value = cmm.getDecimal(num);
        }
    })

    //百分比
	cmm.addClickFun("btn_rate",function(e){
        var num = parseFloat(tb_result.value);
        if (num!= 0){
            tb_result.value = cmm.getDecimal(num/100);
        }
    })

    //开方
	cmm.addClickFun("btn_sqrt",function(e){
        var num = parseFloat(tb_result.value);
        if (num>=0){
            tb_result.value = cmm.getDecimal(Math.sqrt(num));
        }else{
            alert("负数不能开方");
        }
    })

    //sin
    cmm.addClickFun("btn_sin",function(e){
        var num = parseFloat(tb_result.value);
        tb_result.value = parseFloat(cmm.getDecimal(Math.sin(num*Math.PI/180)));    //取小数后10位
    })

    //cos
    cmm.addClickFun("btn_cos",function(e){
        var num = parseFloat(tb_result.value);
        tb_result.value = cmm.getDecimal(Math.cos(num));    //取小数后10位
    })

    //tan
    cmm.addClickFun("btn_tan",function(e){
        var num = parseFloat(tb_result.value);
        tb_result.value = cmm.getDecimal(Math.tan(num));
    })

    //cot
    cmm.addClickFun("btn_cot",function(e){
        var num = parseFloat(tb_result.value);
        if (num!=0){
            tb_result.value = cmm.getDecimal(1/Math.tan(num));
        }else{
            alert("0不能余切");
        }
        
    })

    //除法
	cmm.addClickFun("btn_devide",function(e){
        param1 = tb_result.value;
        oper = "/";
        tb_result.value = 0;
    })
    //乘法
	cmm.addClickFun("btn_minus",function(e){
        param1 = tb_result.value;
        oper = "*";
        tb_result.value = 0;
    })
    //加法
	cmm.addClickFun("btn_add",function(e){
        param1 = tb_result.value;
        oper = "+";
        tb_result.value = 0;
    })
    //减法
	cmm.addClickFun("btn_sub",function(e){
        param1 = tb_result.value;
        oper = "-";
        tb_result.value = 0;
    })
    //等于
	cmm.addClickFun("btn_equal",function(e){
        param2 = tb_result.value;
        if (param1!="" && param2!="" && oper!=""){
            var result = count(parseFloat(param1),parseFloat(param2),oper);
            tb_result.value = result;
        }
    })
	
    //运算
    function count(param1,param2,oper){
        switch(oper){
            case "+":
                return cmm.getDecimal(param1+param2);
            case "-":
                return cmm.getDecimal(param1-param2);
            case "*":
                return cmm.getDecimal(param1*param2);
            case "/":
                if (param2==0){
                    alert("除数不能为0");
                    return 0;
                }
                return cmm.getDecimal(param1/param2);
            default:
                alert("请选择有效运算符！");
                break;
        }
    }

})();








