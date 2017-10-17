(function(){
	$(".side-menu >li >a").on("click",function(){
		$(".side-menu >li").removeClass('active');
		$(this).parent().addClass('active');
	})



})();