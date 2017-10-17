var app = {
	init: function(){
		var me = this;
		me.render();
		me.bind();
	},
	render: function(){
		var me = this;
		//选项卡
		me.tabType = $('#tab-type');
		me.tabQ = $('#tab-question');
		me.tabDev = $('#tab-dev');
	},
	bind: function(){
		var me = this;

		/**
		这是不是一个工厂模型呀？
		**/
		var tab = function(tab) {
		    var obj = new Object();
		    obj.tab = tab;
		    obj.bindTab = function(){

		        obj.tab.find('>.hd li').on('click',function(e){
					obj.tab.find('>.hd li').removeClass('on');
					$(this).addClass('on');

					var _index = $(this).index();
					obj.tab.find('>.bd >ul').hide();
					obj.tab.find('>.bd >ul:eq('+_index+')').show();
				})
				//初始默认
				var _index = obj.tab.find('>.hd li.on').index();
				obj.tab.find('>.bd >ul:eq('+_index+')').show();

		    }
		    return obj;
		}

		var _tabType = new tab(me.tabType);
		_tabType.bindTab();

		var _tabQ = new tab(me.tabQ);
		_tabQ.bindTab();

		var _tabDev = new tab(me.tabDev);
		_tabDev.bindTab();
	}
}
app.init();