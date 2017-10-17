var app = {
	init: function(){
		var that = this;
		//选项卡
		that.fun_tab();

		//导航栏下拉菜单
		that.fun_menu();

		//皮肤下拉
		that.fun_skinMenu();
		//皮肤
		that.fun_skin();
		//返回顶部
		that.fun_top();
	},
	//登录后内容选项卡
	fun_tab: function(){
		var tabObj = $('.cmm-tab');
		tabObj.find('.hd li').on('click',function(e){
			tabObj.find('.hd li').removeClass('on');
			$(this).addClass('on');

			var _index = $(this).index();
			tabObj.find('.bd >ul').hide();
			tabObj.find('.bd >ul:eq('+_index+')').show();
		})

		//初始默认
		var _index = tabObj.find('.hd li.on').index();
		tabObj.find('.bd >ul:eq('+_index+')').show();
	},
	fun_menu: function(){
		//登录后
		$('#nav-user').hover(function(){
			$(this).find('.navbar-set').css('display','block');
		},function(){
			$(this).find('.navbar-set').css('display','none');
		});

		//设置
		$('#nav-set').hover(function(){
			$(this).find('.navbar-set').css('display','block');
		},function(){
			$(this).find('.navbar-set').css('display','none');
		});

		//更多
		$('#nav-more').hover(function(){
			$('.navbar-more').css('display','block');
		},function(){
			$('.navbar-more').css('display','none');
		});
	},
	fun_skinMenu: function(){
		$('#btn_skin').on('click',function(){
			$('.cs-skin').slideDown(500);
		})
		$('#btn_skin_up').on('click',function(){
			$('.cs-skin').slideUp(500);
		})
	},
	//皮肤
	fun_skin: function(){
		var tabObj = $('#skin-type');
		var tabObj_con = $('#skin-con');
		tabObj.find('li').on('click',function(e){
			tabObj.find('li').removeClass('on');
			$(this).addClass('on');

			var _index = $(this).index();
			tabObj_con.find('li').hide();
			tabObj_con.find('li:eq('+_index+')').show();
		})
		//初始默认
		var _index = tabObj.find('li.on').index();
		tabObj_con.find('li:eq('+_index+')').show();


		//选择中状态
		$('.skin-item').hover(function(){
			$(this).find('.skin-writer').fadeIn(500);
		},function(){
			$(this).find('.skin-writer').fadeOut(500);
		})

		//选中皮肤
		$('.skin-item').on('click',function(){
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
		$('#btn_skin_close').on('click',function(){
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
	},
	//返回顶部
	fun_top: function(){
		$('.to-top').hover(function(){
			$(this).find('.icon').css('display','none');
			$(this).find('.mark-text').css('display','block');
		},function(){
			$(this).find('.icon').css('display','block');
			$(this).find('.mark-text').css('display','none');
		})

		$('.to-top').on('click',function(){
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

app.init();









