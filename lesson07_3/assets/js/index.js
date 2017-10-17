var num = 6;

$(function(){
	var dataImg = {
		"data":[
			{'src':'assets/images/1.jpg'},
			{'src':'assets/images/2.jpg'},
			{'src':'assets/images/3.jpg'},
			{'src':'assets/images/4.jpg'},
			{'src':'assets/images/5.jpg'},
			{'src':'assets/images/6.jpg'},
			{'src':'assets/images/7.jpg'}
		]
	}
	if ($(document).width()<1000){
		num = 4;
	}

	img_pos();
	window.onscroll = function(){
		if (scorllside()){
			$.each(dataImg.data,function(index,value){
				var box = $("<div>").addClass("box").appendTo($('.tu-list'));
				var box_img = $("<div>").addClass("box-img").appendTo(box);
				$("<img>").attr("src",$(value).attr('src')).appendTo(box_img);
			})
			img_pos();
		}
	}
	
})

function scorllside(){
	var box = $('.box');
	var last_box_h = box.last().get(0).offsetTop + Math.floor(box.last().height()/2);
	var doc_h = $(document).height();
	var scorll_h = $(window).scrollTop();
	return (last_box_h<(scorll_h+doc_h))?true: false;
}

function img_pos(){
	var box = $('.box');
	//var box_w = box.eq(0).width();
	var doc_w = $(document).width();
	var box_w = Math.floor(doc_w / num);

	$('.box').css({
		"width": box_w
	})
	//var num = Math.floor($(window).width()/box_w);
	
	var box_arr = [];
	box.each(function(index,value){
		var box_h = box.eq(index).height();
		//console.log(box_h)
		if (index<num){
			box_arr[index] = box_h;
		}else{
			var min_box_h = Math.min.apply(null,box_arr);
			//console.log(min_box_h)
			var min_box_index = $.inArray(min_box_h, box_arr);
			$(value).css({
				"position": "absolute",
				"top": min_box_h,
				"left": box.eq(min_box_index).position().left
			})
			box_arr[min_box_index] += box.eq(index).height();
		}
	})
}