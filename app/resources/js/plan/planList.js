/**
 * 开发计划列表js
 */
$(document).ready(function() {
	// 初始化列表
	initTable();
});

// 初始化列表
function initTable() {
	// 初始化列表
	var table = $('#listTable').bootstrapTable({
		url : getContextPath() + '/data/plan/planList.json',
		method : 'get',
		pagination : true,
		sidePagination : 'server',
		uniqueId : 'planId',
		undefinedText : '',
		queryParams : function(params) {
			params.chanceId = $("#chanceId").val();
			params.planToDo = $("#planToDo").val();
			return params;
		},
		responseHandler : responseHandler,
		onPostBody : function() {
			$('#listTable').bootstrapTable("resetView");
			$("a").popover({
				trigger : 'hover'
			});
		}
	});

	$('#togglePagBtn').click(function() {
		$('#listTable').bootstrapTable('togglePagination');
	});

	$('#queryBtn').click(function() {
		$('#listTable').bootstrapTable('selectPage', 1);
	});

	$(window).resize(function() {
		$('#listTable').bootstrapTable('resetView');
	});

	// 操作事件
	window.operateEvents = {
		// 修改
		'click .edit' : function(e, value, row, index) {
			location.href = getContextPath()
					+ '/page/plan/planUpdate.html?chanceId=' + row.chanceId
					+ '&planId=' + row.planId;
		},
		// 删除
		'click .remove' : function(e, value, row, index) {
			deleteConfig(row.planId);
		}
	};
}

// 设置列表数据
function responseHandler(res) {
	if ("success" == res.RET_CODE && res.rows != null) {
		$.each(res.rows, function(i, row) {
			row.index = res.pageIndex + i + 1;
		});
		return res;
	} else {
		return res;
	}
}

// 列表操作列格式化
function operateFormatter(value, row, index) {
	var content = ' <a class="edit btn btn-xs btn-primary" '
			+ ' 	rel="popover-hover" data-placement="top" data-content="执行" '
			+ ' 	href="javascript:void(0)"> '
			+ ' 	<span class="fa fa-pencil"></span> ' + ' </a> '
			+ ' <a class="remove btn btn-xs btn-danger" rel="popover-hover" '
			+ ' 	data-placement="top" data-content="删除" '
			+ ' 	href="javascript:void(0)"> '
			+ ' 	<span class="fa fa-trash-o"></span> ' + ' </a> ';
	return content;
}

// 删除确认
function deleteConfig(id) {
	var dial = dialog({
		title : '确认删除',
		content : '确认删除这个开发计划吗？',
		okValue : '确定',
		ok : function() {
			deleteInfo(id);
		},
		cancelValue : '取消',
		cancel : function() {
		}
	});
	dial.showModal();
};

/**
 * 删除
 */
var deleteInfo = function(id) {
	showModal("正在删除中...");
	$.ajax({
		type : "POST",
		url : getContextPath() + "/data/success.json",
		data : {
			planId : id
		},
		dataType : 'json',
		beforeSend : function() {
		},
		error : function() {
			showAlert("删除出现错误");
		},
		success : function(data) {
			hideModal();// 关闭等待条
			if (data.RET_CODE == 'success') {
				showAlert("删除成功！");
				$('#listTable').bootstrapTable('selectPage', 1);
			} else {
				showAlert("删除失败！");
			}
		}
	});
};
