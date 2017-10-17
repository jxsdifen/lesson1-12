/*
使用单例模式；封装保护变量和方法，声明一个命名空间, 避免命名冲突
这里也比较简单，用不到工厂模式
*/
var app = {
	init: function(){
		var me = this;
		me.render();
		me.bind();
	},
	render: function(){
		var me = this;
		//选项卡
		me.tabObj = $('.cmm-tab');

		//导航栏下拉菜单
		//登录后
		me.navUser = $('#nav-user');
		//设置
		me.navSet = $('#nav-set');
		//更多
		me.navMore = $('#nav-more');


		//皮肤下拉菜单
		me.btnSkin = $('#btn_skin');
		me.btnSkinUp = $('#btn_skin_up');

		//=====皮肤
		me.skinType = $('#skin-type');
		me.skinCon = $('#skin-con');
		me.skinItem = $('.skin-item');
		me.btnSkinClose =$('#btn_skin_close');
		
		//返回顶部
		me.btnTop = $('.to-top');
	},
	bind: function(){
		var me = this;
		//选项卡
		me.tabObj.find('.hd li').on('click',function(e){
			me.tabObj.find('.hd li').removeClass('on');
			$(this).addClass('on');

			var _index = $(this).index();
			me.tabObj.find('.bd >ul').hide();
			me.tabObj.find('.bd >ul:eq('+_index+')').show();
		})
		//初始默认
		var _index = me.tabObj.find('.hd li.on').index();
		me.tabObj.find('.bd >ul:eq('+_index+')').show();


		//导航栏下拉菜单
		me.navUser.hover(function(){
			$(this).find('.navbar-set').css('display','block');
		},function(){
			$(this).find('.navbar-set').css('display','none');
		});
		me.navSet.hover(function(){
			$(this).find('.navbar-set').css('display','block');
		},function(){
			$(this).find('.navbar-set').css('display','none');
		});
		me.navMore.hover(function(){
			$(this).find('.navbar-more').css('display','block');
		},function(){
			$(this).find('.navbar-more').css('display','none');
		});

		//皮肤下拉菜单
		me.btnSkin.on('click',function(){
			$('.cs-skin').slideDown(500);
		})
		me.btnSkinUp.on('click',function(){
			$('.cs-skin').slideUp(500);
		})

		//=======皮肤
		me.skinType.find('li').on('click',function(e){
			me.skinType.find('li').removeClass('on');
			$(this).addClass('on');

			var _index = $(this).index();
			me.skinCon.find('li').hide();
			me.skinCon.find('li:eq('+_index+')').show();
		})
		//初始默认
		var _index = me.skinType.find('li.on').index();
		me.skinCon.find('li:eq('+_index+')').show();


		//选择中状态
		me.skinItem.hover(function(){
			$(this).find('.skin-writer').fadeIn(500);
		},function(){
			$(this).find('.skin-writer').fadeOut(500);
		})
		//选中皮肤
		me.skinItem.on('click',function(){
			var src = $(this).attr('bgSrc');
			$('.bg-tu').css({
				'background-image':'url('+src+')',
				'background-size': '100%'
			});

			//logo
			$('.logo').attr('src','assets/images/logo_white.png');
			//header
			$('header').css({
				'background': 'rgba(0,0,0,0.1)',
				'border-bottom': 'none'
			})
			$('.nav-menu .s-icons a').css({
				'color': '#fff'
			})
			$('.navbar >a').css({
				'color': '#fff'
			})
			$('.user >span,.set >span').css({
				'color': '#fff'
			})
		})
		//清除皮肤
		me.btnSkinClose.on('click',function(){
			$('.bg-tu').css({
				'background-image':'none'
			});

			//logo
			$('.logo').attr('src','assets/images/bd_logo1.png');
			//header
			$('header').css({
				'background': '#fff',
				'border-bottom': '1px solid #ebebeb'
			})
			$('.nav-menu .s-icons a').css({
				'color': '#555'
			})
			$('.navbar >a').css({
				'color': '#555'
			})
			$('.user >span,.set >span').css({
				'color': '#555'
			})
		})


		//返回顶部
		me.btnTop.hover(function(){
			$(this).find('.icon').css('display','none');
			$(this).find('.mark-text').css('display','block');
		},function(){
			$(this).find('.icon').css('display','block');
			$(this).find('.mark-text').css('display','none');
		})

		me.btnTop.on('click',function(){
			$('body,html').animate({scrollTop:'0'},200);
		})

		$(window).scroll(function(){
			var top = $(this).scrollTop();
			if (top>10){
				$('.to-top').css('display','block');
			}else{
				$('.to-top').css('display','none');
			}
		})

	}
}

$(function (){  
   app.init();
});
