(function(){
    var colors = ["#00a066","#ff5500","#f92c1c","#3c7fef","#eff686"];
    var select_color = null;

    //新建颜色按钮
   	var navColor = document.getElementById("navColor");
   	for (var i=0;i<colors.length;i++){
		var span = document.createElement("span");
		span.setAttribute("class","color-item");
		span.setAttribute("style","background-color:"+colors[i]);
		span.setAttribute("color",colors[i]);
		navColor.appendChild(span);
   	}
    
    //给颜色按钮添加事件
	var color_arr = cmm.getClassList("color-item","navColor");
	for (var i = 0;i<color_arr.length;i++){
		cmm.addClickFun(color_arr[i],function(e){
			var _target = cmm.getTarget(e);
			var _color = _target.getAttribute("color");
			//console.log(_color)
			select_color = _color;

			//点击状态
			for (var j = 0;j<color_arr.length;j++){
				cmm.removeClass(color_arr[j], "active");
			}
			cmm.addClass(_target, "active");

			//改变颜色
			changeColor(_color);
		})
	}

	function changeColor(color){
		var _color = color;

		//公司logo
		var company_nav = document.getElementById("company-nav");
		company_nav.style.border = "1px solid "+_color;

		//导航1
		var menus_navbar = document.getElementById("menus_navbar");
		menus_navbar.style.borderTop = "2px solid "+_color;

		var menus_arr = menus_navbar.getElementsByTagName("a");
		for (var i = 0;i<menus_arr.length;i++){
			//当前有active的背景色更改
			var _class = menus_arr[i].getAttribute("class") || "";
			if(_class.trim()=="active"){
				menus_arr[i].style.background = _color;
			}
			//移入
			menus_arr[i].onmouseover = function(e){
				for (var j = 0;j<menus_arr.length;j++){
					var _class = menus_arr[j].getAttribute("class") || "";	
					if(_class.trim()!="active"){
						e.target.style.color = _color;
					}
				}

				var now_class = e.target.getAttribute("class") || "";
				if (now_class.trim()=="active"){
					e.target.style.color = "#fff";
				}
			}
			//移出
			menus_arr[i].onmouseout = function(e){
				for (var j = 0;j<menus_arr.length;j++){
					var _class = menus_arr[j].getAttribute("class") || "";	
					if(_class.trim()!="active"){
						e.target.style.color = "#333";
					}
				}
				var now_class = e.target.getAttribute("class") || "";
				if (now_class.trim()=="active"){
					e.target.style.color = "#fff";
				}
			}
			//点击
			menus_arr[i].onclick = function(e){
				for (var j = 0;j<menus_arr.length;j++){
					cmm.removeClass(menus_arr[j], "active");
					menus_arr[j].style.color = "#333";
					menus_arr[j].style.background = "none";
				}
				cmm.addClass(e.target, "active");
				e.target.style.color = "#fff";
				e.target.style.background = _color;
			}
		}

		//导航2
		var govsite_navbar = document.getElementById("govsite_navbar");
		govsite_navbar.style.borderColor = _color;
		govsite_navbar.getElementsByClassName("title")[0].style.color = _color;


		//导航2
		var left_navbar = document.getElementById("left_navbar");
		var left_arr = left_navbar.getElementsByTagName("a");
		for (var i = 0;i<left_arr.length;i++){
			//当前有active的背景色更改
			var _class = left_arr[i].getAttribute("class") || "";
			if(_class.trim()=="active"){
				left_arr[i].style.color = _color;
				left_arr[i].style.borderTopColor = _color;
			}
			//移入
			left_arr[i].onmouseover = function(e){
				for (var j = 0;j<left_arr.length;j++){
					var _class = left_arr[j].getAttribute("class") || "";	
					if(_class.trim()!="active"){
						e.target.style.color = _color;
					}
				}

				var now_class = e.target.getAttribute("class") || "";
				if (now_class.trim()=="active"){
					e.target.style.color = _color;
				}
			}
			//移出
			left_arr[i].onmouseout = function(e){
				for (var j = 0;j<left_arr.length;j++){
					var _class = left_arr[j].getAttribute("class") || "";	
					if(_class.trim()!="active"){
						e.target.style.color = "#333";
					}
				}
				var now_class = e.target.getAttribute("class") || "";
				if (now_class.trim()=="active"){
					e.target.style.color = _color;
				}
			}
			//点击
			left_arr[i].onclick = function(e){
				for (var j = 0;j<left_arr.length;j++){
					cmm.removeClass(left_arr[j], "active");
					left_arr[j].style.color = "#333";
					left_arr[j].style.borderTopColor = "#cecece";
				}
				cmm.addClass(e.target, "active");
				e.target.style.color = _color;
				e.target.style.borderTopColor = _color;
			}
		}

		//全体有skinColor的更改
		var skin_arr = cmm.getClassList("skinColor");
		for (var i = 0;i<skin_arr.length;i++){
			skin_arr[i].style.color = _color;
			skin_arr[i].style.borderColor = _color;
		}
	}

	//读取本地储存localStorage
	if (localStorage.haoSkinColor){
		for (var i = 0;i<color_arr.length;i++){
			if (localStorage.haoSkinColor == color_arr[i].getAttribute("color")){
				color_arr[i].click();
			}
		}
	}else{
		document.getElementsByClassName("color-item")[0].click();
	}

	window.onunload = function(){
		localStorage.haoSkinColor = select_color;
	}
})();








