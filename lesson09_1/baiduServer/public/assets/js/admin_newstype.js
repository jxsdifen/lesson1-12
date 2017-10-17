var app = {
	edit_id: 0,
	del_id: 0,
	news_data: null,
	init: function(){
		var that = this;
		that.refreshNews();
		that.event();
	},
	event: function(){
		var that = this;
		function getFromData(){
			var _type = $('#newstype');
			if (_type.val()===''){
				_type.parent().addClass('has-error');
				return false;
			}else{
				_type.parent().removeClass('has-error');
			}

			var result = {
				typename: _type.val(),
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
				url: '/adminNewsType/add',
				type: 'post',
				dataType: 'json',
				data: result,
				success: function(data){
					console.log(data)
					if (data.state == 'success'){
						$('#newstype').val('');
						that.refreshNews();
					}
				}
			})
		})


		function getFromData_edit(){
			var _type = $('#newstype_edit');
			if (_type.val()===''){
				_type.parent().addClass('has-error');
				return false;
			}else{
				_type.parent().removeClass('has-error');
			}

			var result = {
				typename: _type.val(),
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
				if (item.id == _id){
					$('#newstype_edit').val(item.typename);
				}
			})

			$('#Modal_edit').modal('show');
		})
		$('#btn-edit').on('click',function(e){
			e.preventDefault();

			var result = getFromData_edit();
			if (!result) return;
			
			$.ajax({
				url: '/adminNewsType/edit',
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
				url: '/adminNewsType/del',
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
			url: '/adminNewsType/list',
			type: 'get',
			dataType: 'json',
			success: function(data){
				that.news_data = data.data;

				if (data.state == 'success'){
					$.each(data.data,function(index,item){

						var $td_id = $('<td>').html(item.newstype_id);
						var $td_name = $('<td>').html(item.newstype_name);

						var $td_order = $('<td>');
						var $btn_edit = $('<button></button>').attr('type','button').addClass('btn btn-primary btn-xs mr5 btn-edit').html('编辑');
						var $btn_del = $('<button></button>').attr('type','button').addClass('btn btn-danger btn-xs btn-del').html('删除');
						$td_order.append($btn_edit, $btn_del);

						var $tr = $('<tr>');
						$tr.append($td_id, $td_name, $td_order);
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