/**
 * 服务反馈列表js
 */
$(document).ready(function() {

	// 初始化列表
	initTable();
});

// 初始化列表
function initTable() {
	// 初始化列表
	var table = $('#listTable').bootstrapTable({
		url : getContextPath() + '/data/service/serviceSatisfyList.json',
		method : 'get',
		pagination : true,
		sidePagination : 'server',
		uniqueId : 'serId',
		undefinedText : '',
		queryParams : function(params) {
			params.custName = $("#custName").val();
			params.serType = $("#serType").val();
			params.serTitle = $("#serTitle").val();
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
					+ '/page/servicesatisfy/serviceSatisfyUpdate.html?serId='
					+ row.serId;
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
			+ ' 	rel="popover-hover" data-placement="top" data-content="反馈" '
			+ ' 	href="javascript:void(0)"> '
			+ ' 	<span class="fa fa-pencil"></span> ' + ' </a> ';
	return content;
}

// 服务类型id转名
function serTypeFormatter(value, row, index) {
	var serType = row.serType;
	var content = '';
	if (serType == '1') {
		content = '咨询';
	} else if (serType == '2') {
		content = '建议';
	} else if (serType == '3') {
		content = '投诉';
	} else if (serType == '4') {
		content = '其它';
	}
	return content;
}

// 服务状态id转名
function serStatusFormatter(value, row, index) {
	var serStatus = row.serStatus;
	var content = '';
	if (serStatus == '1') {
		content = '新创建';
	} else if (serStatus == '2') {
		content = '已分配';
	} else if (serStatus == '3') {
		content = '已处理';
	} else if (serStatus == '4') {
		content = '归档';
	}
	return content;
}
