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
		url : getContextPath() + '/data/salechance/planSaleChanceList.json',
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
		// 查看开发计划
		'click .plan' : function(e, value, row, index) {
			location.href = getContextPath()
					+ '/page/plan/planList.html?chanceId=' + row.chanceId;
		},
		// 开发成功
		'click .suc' : function(e, value, row, index) {
			setSuccessConfig(row.chanceId);
		},
		// 开发失败
		'click .err' : function(e, value, row, index) {
			setErrorConfig(row.chanceId);
		},
		// 查看销售机会
		'click .info' : function(e, value, row, index) {
			location.href = getContextPath()
					+ '/page/plan/saleChanceInfo.html?chanceId=' + row.chanceId;
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
	var content = ' <a class="plan btn btn-xs btn-primary" '
			+ ' 	rel="popover-hover" data-placement="top" data-content="开发计划管理" '
			+ ' 	href="javascript:void(0)"> '
			+ ' 	<span class="fa fa-align-justify"></span> ' + ' </a> '
			+ ' <a class="suc btn btn-xs btn-primary" '
			+ ' 	rel="popover-hover" data-placement="top" data-content="开发成功" '
			+ ' 	href="javascript:void(0)"> '
			+ ' 	<span class="fa fa-check"></span> ' + ' </a> '
			+ ' <a class="err btn btn-xs btn-danger" '
			+ ' 	rel="popover-hover" data-placement="top" data-content="开发失败" '
			+ ' 	href="javascript:void(0)"> '
			+ ' 	<span class="fa fa-times"></span> ' + ' </a> '
			+ ' <a class="info btn btn-xs btn-default" '
			+ ' 	rel="popover-hover" data-placement="top" data-content="查看" '
			+ ' 	href="javascript:void(0)"> '
			+ ' 	<span class="fa fa-search"></span> ' + ' </a>&nbsp; ';
	return content;
}

// 状态id转名
function chanceStatusFormatter(value, row, index) {
	var chanceStatus = row.chanceStatus;
	var content = '';
	if (chanceStatus == '0') {
		content = '未指派';
	} else if (chanceStatus == '1') {
		content = '开发中';
	} else if (chanceStatus == '2') {
		content = '开发成功';
	} else if (chanceStatus == '-1') {
		content = '开发失败';
	}
	return content;
}

// 开发成功确认
function setSuccessConfig(id) {
	var dial = dialog({
		title : '确认开发成功',
		content : '确认这个销售机会已开发成功吗？',
		okValue : '确定',
		ok : function() {
			setSuccess(id);
		},
		cancelValue : '取消',
		cancel : function() {
		}
	});
	dial.showModal();
};

/**
 * 开发成功
 */
var setSuccess = function(id) {
	showModal("正在处理中...");
	$.ajax({
		type : "POST",
		url : getContextPath() + "/data/success.json",
		data : {
			chanceId : id,
			chanceStatus : '2'
		},
		dataType : 'json',
		beforeSend : function() {
		},
		error : function() {
			showAlert("处理出现错误");
		},
		success : function(data) {
			hideModal();// 关闭等待条
			if (data.RET_CODE == 'success') {
				showAlert("开发成功处理完成！");
				$('#listTable').bootstrapTable('selectPage', 1);
			} else {
				showAlert("处理失败！");
			}
		}
	});
};

// 开发失败确认
function setErrorConfig(id) {
	var dial = dialog({
		title : '确认开发失败',
		content : '确认这个销售机会已开发失败吗？',
		okValue : '确定',
		ok : function() {
			setError(id);
		},
		cancelValue : '取消',
		cancel : function() {
		}
	});
	dial.showModal();
};

/**
 * 开发失败
 */
var setError = function(id) {
	showModal("正在处理中...");
	$.ajax({
		type : "POST",
		url : getContextPath() + "/data/success.json",
		data : {
			chanceId : id,
			chanceStatus : '-1'
		},
		dataType : 'json',
		beforeSend : function() {
		},
		error : function() {
			showAlert("处理出现错误");
		},
		success : function(data) {
			hideModal();// 关闭等待条
			if (data.RET_CODE == 'success') {
				showAlert("开发失败处理完成！");
				$('#listTable').bootstrapTable('selectPage', 1);
			} else {
				showAlert("处理失败！");
			}
		}
	});
};
