var app = {
	news_data: null,
	init: function(){
		var that = this;
		that.event();
	},
	set_nav: function(){
		var _w = $(window).width();
		var li_list = $('.nav-type ul li');
		li_list.each(function(index,item){
			var con = $(this).find('a').html().split('');
			if (con.length>2){
				$(this).width(_w/3);
			}else{
				$(this).width(_w/6);
			}
		});
	},
	event: function(){
		var that = this;

		$.ajax({
			url: 'server/newstype.php',
			type: 'get',
			dataType: 'json',
			success: function(data){
				// console.log(data);
				var $list = $('.nav-type ul');

				if (data.state == 'success'){
					$.each(data.data,function(index,item){
						var $item = $('<li></li>').attr('data-id',item.id).appendTo($list);
						$('<a>').attr('href','javascript:;').html(item.typename).appendTo($item);
					})
					that.set_nav();
					set_start();
				}
			}
		})
		function set_start(){
			var li_list = $('.nav-type ul li');
			li_list.on('click',function(e){
				li_list.removeClass('on');
				$(this).addClass('on');

				var type = $(this).attr('data-id');

				that.refreshNews(type);
			})
			li_list.eq(0).click();
		}



		$('.news-list').on('click','li',function(){
			var id = $(this).attr('data-id');

			$.each(that.news_data,function(index,item){
				if (item.id == id){
					$('.news-detail .detail-title').html(item.title);
					$('.news-detail .detail-date').html(item.date);
					$('.news-detail .detail-con').html(item.desc);
					$('.news-detail .detail-img').attr('src',item.img);
					
					$('article').hide();
					$('.news-detail').show();
				}
			})
		})

		$('.detail-close').on('click',function(){
			$('article').show();
			$('.news-detail').hide();
		})
	},
	refreshNews: function(type){
		var that = this;
		var $list = $('.news-list');
		$list.empty();

		$.ajax({
			url: 'server/news.php',
			type: 'get',
			dataType: 'json',
			data: {type: type},
			success: function(data){
				// console.log(data.state)
				that.news_data = data.data;

				if (data.state == 'success'){
					$.each(data.data,function(index,item){

						var $item = $('<li></li>').addClass('news-item').attr('data-id',item.id).prependTo($list);
						var $imgdiv = $('<div></div>').addClass('news-img').appendTo($item);
						var $img = $('<img>').attr('src',item.img).appendTo($imgdiv);

						var $con = $('<div></div>').addClass('news-con').appendTo($item);
						var $h1 = $('<h1></h1>').html(item.title).appendTo($con);
						var $other = $('<div></div>').addClass('news-con-other').appendTo($con);
						var $time = $('<span></span>').addClass('time').html(item.date).appendTo($other);
						var $hot = $('<span></span>').addClass('hot').html('热点').appendTo($other);
					})
				}
			}
		})
		
		
	}

}



$(function(){
	app.init();
})