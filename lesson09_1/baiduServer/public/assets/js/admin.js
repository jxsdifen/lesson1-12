var app = {
	edit_id: 0,
	del_id: 0,
	news_data: null,
	init: function(){
		var that = this;
		that.refreshNews();
		that.fun_type();
		that.event();
	},
	fun_type: function(){
		$.ajax({
			url: '/adminNewsType/list',
			type: 'get',
			dataType: 'json',
			success: function(data){
				//console.log(data)

				if (data.state == 'success'){
					$.each(data.data,function(index,item){
						var $option = $('<option>').attr('value',item.newstype_id).html(item.newstype_name);
						$('#newstype, #newstype_edit').append($option);
					})
				}

			}
		})
	},
	event: function(){
		var that = this;
		function getFromData(){
			var _title = $('#newstitle');
			if (_title.val()===''){
				_title.parent().addClass('has-error');
				return false;
			}else{
				_title.parent().removeClass('has-error');
			}

			var _type = $('#newstype');
			if (_type.val()===''){
				_type.parent().addClass('has-error');
				return false;
			}else{
				_type.parent().removeClass('has-error');
			}

			var _img = $('#newsimg');
			if (_img.val()===''){
				_img.parent().addClass('has-error');
				return false;
			}else{
				_img.parent().removeClass('has-error');
			}

			var _desc = $('#newsdesc');
			if (_desc.val()===''){
				_desc.parent().addClass('has-error');
				return false;
			}else{
				_desc.parent().removeClass('has-error');
			}

			var _date = $('#newsdate');
			if (_date.val()===''){
				_date.parent().addClass('has-error');
				return false;
			}else{
				var r = /^\d{4}(\-|\/|.)\d{1,2}\1\d{1,2}$/;
				if (!r.test(_date.val())){
					_date.parent().addClass('has-error');
					return false;
				}else{
					_date.parent().removeClass('has-error');
				}
			}

			var result = {
				title: _title.val(),
				type: _type.val(),
				img: _img.val(),
				desc: _desc.val(),
				date: _date.val(),
				ac: 'add'
			}
			return result;
		}
		//添加
		$('#btn_add').on('click',function(e){
			e.preventDefault();

			var result = getFromData();
			if (!result) return;

			$.ajax({
				url: '/adminNews/add',
				type: 'post',
				dataType: 'json',
				data: result,
				success: function(data){

					if (data.state == 'success'){
						$('#newstitle').val('');
						$('#newsimg').val('');
						$('#newsdesc').val('');
						$('#newsdate').val('');
						that.refreshNews();
					}
				}
			})
		})


		function getFromData_edit(){
			var _title = $('#newstitle_edit');
			if (_title.val()===''){
				_title.parent().addClass('has-error');
				return false;
			}else{
				_title.parent().removeClass('has-error');
			}

			var _type = $('#newstype_edit');
			if (_type.val()===''){
				_type.parent().addClass('has-error');
				return false;
			}else{
				_type.parent().removeClass('has-error');
			}

			var _img = $('#newsimg_edit');
			if (_img.val()===''){
				_img.parent().addClass('has-error');
				return false;
			}else{
				_img.parent().removeClass('has-error');
			}

			var _desc = $('#newsdesc_edit');
			if (_desc.val()===''){
				_desc.parent().addClass('has-error');
				return false;
			}else{
				_desc.parent().removeClass('has-error');
			}

			var _date = $('#newsdate_edit');
			if (_date.val()===''){
				_date.parent().addClass('has-error');
				return false;
			}else{
				var r = /^\d{4}(\-|\/|.)\d{1,2}\1\d{1,2}$/;
				if (!r.test(_date.val())){
					_date.parent().addClass('has-error');
					return false;
				}else{
					_date.parent().removeClass('has-error');
				}
			}

			var result = {
				title: _title.val(),
				type: _type.val(),
				img: _img.val(),
				desc: _desc.val(),
				date: _date.val(),
				ac: 'edit',
				id: that.edit_id
			}
			return result;
		}

		var $table = $('#news-table');
		//修改
		$table.on('click','.btn-edit',function(){
			var _id = $(this).parent().parent().find('td:eq(0)').html();
			that.edit_id = _id;

			$.each(that.news_data,function(index,item){
				if (item.newsid == _id){
					$('#newstitle_edit').val(item.newstitle);
					$('#newsimg_edit').val(item.newsimg);
					$('#newsdesc_edit').val(item.newsdesc);
					$('#newsdate_edit').val(item.newsdate.split('T')[0]);
					var _type = item.newstype_name;

					$("#newstype_edit option").each(function(index,item) {
			        	if ($(this).val() == _type) {  
			                $(this).attr("selected", "selected");
			            }
			        });
				}
			})

			$('#Modal_edit').modal('show');
		})
		$('#btn-edit').on('click',function(e){
			e.preventDefault();

			var result = getFromData_edit();
			if (!result) return;
			
			$.ajax({
				url: '/adminNews/edit',
				type: 'post',
				dataType: 'json',
				data: result,
				success: function(data){
					if (data.state == 'success'){
						$('#Modal_edit').modal('hide');
						that.refreshNews();
					}
				}
			})
		})
		//删除
		$table.on('click','.btn-del',function(){
			var _id = $(this).parent().parent().find('td:eq(0)').html();
			that.del_id = _id;

			$('#Modal_del').modal('show');
		})
		$('#btn-del').on('click',function(e){
			$.ajax({
				url: '/adminNews/del',
				type: 'post',
				dataType: 'json',
				data: {ac: 'del', id: that.del_id},
				success: function(data){
					if (data.state == 'success'){
						$('#Modal_del').modal('hide');
						that.refreshNews();
					}
				}
			})
		})
	},
	refreshNews: function(){
		var that = this;
		var $table = $('#news-table tbody');
		$table.empty();
		
		$.ajax({
			url: '/adminNews/list',
			type: 'get',
			dataType: 'json',
			success: function(data){
				// console.log(data)
				// console.log(data.state)
				// console.log(data.data)
				that.news_data = data.data;

				if (data.state == 'success'){
					$.each(data.data,function(index,item){

						var $td_id = $('<td>').html(item.newsid);
						var $td_title = $('<td>').html(item.newstitle);
						var $td_type = $('<td>').html(item.newstype_name);
						var $td_img = $('<td>');
						var $img = $('<img>').attr('src',item.newsimg);
						$td_img.append($img);

						var $td_date = $('<td>').html(item.newsdate.split('T')[0]);
						var $td_order = $('<td>');
						var $btn_edit = $('<button></button>').attr('type','button').addClass('btn btn-primary btn-xs mr5 btn-edit').html('编辑');
						var $btn_del = $('<button></button>').attr('type','button').addClass('btn btn-danger btn-xs btn-del').html('删除');
						$td_order.append($btn_edit, $btn_del);

						var $tr = $('<tr>');
						$tr.append($td_id, $td_title, $td_type, $td_img, $td_date, $td_order);
						$table.append($tr);
					})
				}

			}
		})
		
		
	}

}



$(function(){
	app.init();
})