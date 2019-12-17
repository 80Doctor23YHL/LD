/**
 * 销售机会列表js
 */
$(document).ready(function() {

	// 初始化列表
	initTable();
});

// 初始化列表
function initTable() {
	// 初始化列表
	var table = $('#listTable').bootstrapTable({
		url : getContextPath() + '/data/salechance/saleChanceList.json',
		method : 'get',
		pagination : true,
		sidePagination : 'server',
		uniqueId : 'chanceId',
		undefinedText : '',
		queryParams : function(params) {
			params.customerName = $("#customerName").val();
			params.title = $("#title").val();
			params.contact = $("#contact").val();
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
		// 分配人修改
		'click .dueTo' : function(e, value, row, index) {
			location.href = getContextPath()
					+ '/page/salechance/saleChanceDueToUpdate.html?chanceId='
					+ row.chanceId;
		},
		// 修改
		'click .edit' : function(e, value, row, index) {
			location.href = getContextPath()
					+ '/page/salechance/saleChanceUpdate.html?chanceId='
					+ row.chanceId;
		},
		// 删除
		'click .remove' : function(e, value, row, index) {
			deleteConfig(row.chanceId);
		},
		// 查看
		'click .info' : function(e, value, row, index) {
			location.href = getContextPath()
					+ '/page/salechance/saleChanceInfo.html?chanceId='
					+ row.chanceId;
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
	var content = '';
	if (row.chanceStatus == 0 || row.chanceStatus == 1) {
		content = content
				+ ' <a class="dueTo btn btn-xs btn-primary" '
				+ ' 	rel="popover-hover" data-placement="top" data-content="任务指派" '
				+ ' 	href="javascript:void(0)"> '
				+ ' 	<span class="fa fa-hand-o-right"></span> ' + ' </a> ';
		content = content
				+ ' <a class="edit btn btn-xs btn-primary" '
				+ ' 	rel="popover-hover" data-placement="top" data-content="编辑" '
				+ ' 	href="javascript:void(0)"> '
				+ ' 	<span class="fa fa-pencil"></span> ' + ' </a> ';
	}
	if (row.chanceStatus == 0) {
		content = content
				+ ' <a class="remove btn btn-xs btn-danger" rel="popover-hover" '
				+ ' 	data-placement="top" data-content="删除" '
				+ ' 	href="javascript:void(0)"> '
				+ ' 	<span class="fa fa-trash-o"></span> ' + ' </a> ';
	}
	content = content
			+ ' <a class="info btn btn-xs btn-default" rel="popover-hover" '
			+ ' 	data-placement="top" data-content="查看" '
			+ ' 	href="javascript:void(0)"> '
			+ ' 	<span class="fa fa-search"></span> ' + ' </a> ';
	return content;
}

// 状态id转名
function chanceStatusFormatter(value, row, index) {
	var chanceStatus = row.chanceStatus;
	var content = '';
	if (chanceStatus == '0') {
		content = '未指派';
	} else if (chanceStatus == '1') {
		content = '已指派';
	} else if (chanceStatus == '2') {
		content = '开发成功';
	} else if (chanceStatus == '-1') {
		content = '开发失败';
	}
	return content;
}

// 删除确认
function deleteConfig(id) {
	var dial = dialog({
		title : '确认删除',
		content : '确认删除这个销售机会吗？',
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
 * 销售机会删除
 */
var deleteInfo = function(id) {
	showModal("正在删除中...");
	$.ajax({
		type : "POST",
		url : getContextPath() + "/data/success.json",
		data : {
			chanceId : id
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