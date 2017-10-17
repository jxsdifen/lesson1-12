var cmm = {
	//获取不同浏览器event对象
	getEvent:function(event){
		return event || window.event;
	},
	//获取目标对象
	getTarget: function(event){
		return event.target || event.srcElement;
	},
	
	//给对象添加事件，支持ie
	addClickFun: function(obj,fun){
		var _obj = obj;
		if (typeof(obj)=="string"){
			_obj = document.getElementById(obj);
		}
		if (_obj.addEventListener){
			_obj.addEventListener("click",fun);
		}else if(_obj.attachEvent){
			_obj.attachEvent("onclick",fun);
		}else{
			_obj.onclick = fun;
		}
	},
	//给对象删除事件，支持ie
	removeClickFun: function(obj,fun){
		var _obj = obj;
		if (typeof(obj)=="string"){
			_obj = document.getElementById(obj);
		}
		
		if (_obj.removeEventListener){
			_obj.removeEventListener("click",fun);
		}else if(_obj.detachEvent){
			_obj.detachEvent("onclick",fun);
		}else{
			_obj.onclick = null;
		}
	},
	//ie8不支持getElementsByClassName，写个方法
	getClassList: function(className,tagName){
		tagName = tagName || "*";
		if (document.getElementsByClassName) {
			return document.getElementsByClassName(className);
		} else {
			var tag = document.getElementsByTagName(tagName);
			var tagAll = [];
			for (var i = 0; i < tag.length; i++) {
				for (var j = 0, n = tag[i].className.split(' ') ; j < n.length; j++) {
					if (n[j] == className) {
						tagAll.push(tag[i]);
						break;
					}
				}
			}
			return tagAll;
		}
	},
	
	//小数后超过10位都取10位
    getDecimal: function(num){
        var len = 0;
        if (num.toString().indexOf('.')>=0){
            len = num.toString().split('.')[1].length;
        }
        if (len>10){
            num = parseFloat(num).toFixed(10);
        }
        return num;
    }
	
}

