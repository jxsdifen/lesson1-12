var app = {
	init: function(){
		var that = this;
		//导航栏下拉
		that.fun_navMenu();
		//课程左侧导航
		that.fun_navLeft();

		that.fun_list_nav();
		//内容样式切换
		that.fun_list();

		that.fun_gotop();

		that.fun_search();
	},
	//导航栏下拉
	fun_navMenu: function(){
		var tabObj = $('.header-nav');
		tabObj.find('>li').hover(function(){
			$(this).find('.header-nav-two').fadeIn(200);
		},function(){
			$(this).find('.header-nav-two').fadeOut(200);
		})
	},
	fun_navLeft: function(){
		var tabObj = $('.jk-course-nav-two');
		tabObj.find('>li').hover(function(){
			$(this).find('.jk-course-nav-three').css('display','block');
		},function(){
			$(this).find('.jk-course-nav-three').css('display','none');
		})
	},
	fun_list_nav: function(){
		var tabObj = $('.ul-type');
		tabObj.find('>li').hover(function(){
			$(this).find('.ul-type-two').css('display','block');
		},function(){
			$(this).find('.ul-type-two').css('display','none');
		})
	},
	fun_list: function(){
		$('.style-icon-block').on('click',function(){
			$('.jk-course-list').removeClass('line');
		})
		$('.style-icon-inline').on('click',function(){
			$('.jk-course-list').addClass('line');
		})
	},
	fun_gotop: function(){
		$(window).scroll(function(){
			var top = $(this).scrollTop();
			if (top>10){
				$('.gotop .top').css('display','block');
			}else{
				$('.gotop .top').css('display','none');
			}
		})

		$('.gotop .top').on('click',function(){
			$('body,html').animate({scrollTop:'0'},200);
		})
	},
	fun_search: function(){
		$('.icon-list .icon-search').on('click',function(){
			$('.search-frame').show();
			$('.search-frame').animate({ width: 840},500);
		})
		$('.search-frame .icon-close').on('click',function(){
			$('.search-frame').animate({ width: 0},500,function(){
	            $('.search-frame').hide();
	        });
		})
	}
}

app.init();









