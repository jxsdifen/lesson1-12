(function(){
	
	var arr =["a", "x", "b", "d", "m", "a", "k", "m", "p", "j", "a","m"];
    var _arr = [];  //存不重复数组项,每一项是一个对象{val:值,num:重复数}
    var max = 0;	//最大个数
    var _maxarr = [];  //存个数最多的数组,每一项是一个对象{_char:值,_pos:重复出现下标}

    document.getElementById("btn-find").addEventListener("click",function(){
    	// 处理思路=====

    	//得到不重复数组
        _arr = removeDuplicates(arr);
        console.log("数组不重复值个数="+_arr.length);

        //处理对应个数
        coust_num(_arr, arr);
        // _arr.forEach(function(_val,index){  
        //     console.log(_val.val+"=="+_val.num);
        // })

        //得到出现最多字母，和个数
        //var max = Math.max.apply( Math, num_arr );
        max = maxVal(_arr);
        _arr.forEach(function(_val,index){  
            if (_val.num == max){
            	_maxarr.push({
            		_char: _val.val,
            		_pos: ""
            	});
            }
        })

        //下标
        _maxarr.forEach(function(_val,index){
            var temparr =[];
            var tempchar = _val._char;
            arr.forEach(function(val,index){  
	            if (val == tempchar) temparr.push(index);
	        })
	        _val._pos = temparr;
        })

        //赋值
        var show_char="",show_pos="";
        _maxarr.forEach(function(_val,index){  
            show_char += ","+_val._char;
            show_pos += "----"+ _val._pos.join();
        })
        if (show_char.length>0) show_char = show_char.substr(1);
        if (show_pos.length>0) show_pos = show_pos.substr(4);
        document.getElementById("s_char").innerText = show_char;
        document.getElementById("s_num").innerText = max;
        document.getElementById("s_pos").innerText = show_pos;

        var arr_show = "";
        _arr.forEach(function(_val,index){  
            arr_show += (_val.val+" ----- 个数："+_val.num+"\n");
        })
        document.getElementById("s_show").innerText = arr_show;
    })

    //得到不重复数组
    function removeDuplicates(arr){
        var temp_arr =[];

        var isDupl = false; //不重复为false,重复为true
        for (var i in arr){
            isDupl = false;
            for (var j in temp_arr){
                if  (arr[i] == temp_arr[j].val){
                    isDupl =true;
                }
            }
            if (!isDupl){
            	var _obj = {
            		val: arr[i],
            		num: 0
            	}
                temp_arr.push(_obj);
            }
        }
        return temp_arr;
    }

    //处理对应个数
    function coust_num(_arr, arr){
        //var _num_arr =[];
        var num = 0;
        _arr.forEach(function(_val){

            num = 0;
            for (var i in arr){
                if  (_val.val == arr[i]){
                    num++;
                }
            }
            _val.num = num;
            //_num_arr.push(num);
        })
        //return _num_arr;
    }

    //返回最大值
    function maxVal(_arr){
    	var max = 0;
    	_arr.forEach(function(_val){
            if (_val.num >max){
            	max = _val.num;
            }
        })
        return max;
    }

})();









