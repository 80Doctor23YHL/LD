/**
 * 客户订单统计列表js
 */
$(document).ready(function() {

	// 初始化列表
	initTable();
});

// 初始化列表
function initTable() {
	// 初始化列表
	var table = $('#listTable').bootstrapTable({
		url : getContextPath() + '/data/report/orderReport.json',
		method : 'get',
		pagination : true,
		sidePagination : 'server',
		uniqueId : 'custId',
		undefinedText : '',
		queryParams : function(params) {
			params.year = $("#year").val();
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
	window.operateEvents = {};
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
	var content = '';
	return content;
}