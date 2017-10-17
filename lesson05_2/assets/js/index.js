(function(){
	var param1="",param2="",oper="";

	//按数字
	$('.num').on('click',function(){
		var num = $(this).html();

		//文本框中为0
		if ($('#tb_output').val() == "0"){
			$('#tb_output').val(num);
		}else{
			$('#tb_output').val($('#tb_output').val()+num);
		}

	});

	//小数字
	$('#btn_point').on('click',function(){
		var point = $(this).html();
		$('#tb_output').val($('#tb_output').val()+point);
	});

	//清空
	$('#btn_ac').on('click',function(){
		$('#tb_output').val("0");
		param1="",param2="",oper="";
	});

	//正负值
	$('#btn_or').on('click',function(){
		var num = parseFloat($('#tb_output').val());
		if (num!= 0){
			$('#tb_output').val(-num);
		}
	});
	//百分比
	$('#btn_rate').on('click',function(){
		var num = parseFloat($('#tb_output').val());
		if (num!= 0){
			$('#tb_output').val(num/100);
		}
	});


	//除法
	$('#btn_devide').on('click',function(){
		param1 = $('#tb_output').val();
		oper = $(this).html();
		$('#tb_output').val("0");
		//param2 = "";
	});
	//乘法
	$('#btn_minus').on('click',function(){
		param1 = $('#tb_output').val();
		oper = $(this).html();
		$('#tb_output').val("0");
		//param2 = "";
	});
	//加法
	$('#btn_add').on('click',function(){
		param1 = $('#tb_output').val();
		oper = $(this).html();
		$('#tb_output').val("0");
		//param2 = "";
	});
	//减法
	$('#btn_sub').on('click',function(){
		param1 = $('#tb_output').val();
		oper = $(this).html();
		$('#tb_output').val("0");
		//param2 = "";
	});
	//等于
	$('#btn_equal').on('click',function(){
		param2 = $('#tb_output').val();
		if (param1!="" && param2!="" && oper!=""){
			var result = count(parseFloat(param1),parseFloat(param2),oper);
			$('#tb_output').val(result);
		}
	});

	//运算
	function count(param1,param2,oper){
		switch(oper){
			case "+":
				return param1+param2;
			case "-":
				return param1-param2;
			case "*":
				return param1*param2;
			case "/":
				if (param2==0){
					alert("除数不能为0");
					return;
				}
				return param1/param2;
			default:
				alert("请选择有效运算符！");
				break;
		}
	}

})();









