/**
 * 客户流失列表js
 */
$(document).ready(function() {

	// 初始化客户经理下拉框
	initCustManagerIdSelect();

	// 初始化列表
	initTable();
});

// 初始化列表
function initTable() {
	// 初始化列表
	var table = $('#listTable').bootstrapTable({
		url : getContextPath() + '/data/customer/customerList.json',
		method : 'get',
		pagination : true,
		sidePagination : 'server',
		uniqueId : 'custId',
		undefinedText : '',
		queryParams : function(params) {
			params.custName = $("#custName").val();
			params.custStatus = $("#custStatus").val();
			params.custManagerId = $("#custManagerId").val();
			params.custLevel = $("#custLevel").val();
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

		// 延缓流失
		'click .delayWay' : function(e, value, row, index) {
			location.href = getContextPath()
					+ '/page/customerlost/customerLostDelayWayUpdate.html?custId='
					+ row.custId;
		},
		// 确认已流失
		'click .detail' : function(e, value, row, index) {
			location.href = getContextPath()
					+ '/page/customerlost/customerLostDetailUpdate.html?custId='
					+ row.custId;
		},
		// 恢复正常
		'click .status' : function(e, value, row, index) {
			updateStatusConfig(row.custId);
		},
		// 详情
		'click .info' : function(e, value, row, index) {
			location.href = getContextPath()
					+ '/page/customerlost/customerInfo.html?custId='
					+ row.custId;
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
	if (row.custStatus != '0') {
		content = content
				+ ' <a class="delayWay btn btn-xs btn-primary" '
				+ ' 	rel="popover-hover" data-placement="top" data-content="延缓流失" '
				+ ' 	href="javascript:void(0)"> '
				+ ' 	<span class="fa fa-stumbleupon"></span> '
				+ ' </a> '
				+ ' <a class="detail btn btn-xs btn-danger" '
				+ ' 	rel="popover-hover" data-placement="top" data-content="确认已流失" '
				+ ' 	href="javascript:void(0)"> '
				+ ' 	<span class="fa fa-unlink"></span> ' + ' </a> ';
	} else {
		content = content
				+ ' <a class="status btn btn-xs btn-primary" '
				+ ' 	rel="popover-hover" data-placement="top" data-content="恢复正常" '
				+ ' 	href="javascript:void(0)"> '
				+ ' 	<span class="fa fa-link"></span> ' + ' </a> ';
	}
	content = content + ' <a class="info btn btn-xs btn-default" '
			+ ' 	rel="popover-hover" data-placement="top" data-content="客户信息" '
			+ ' 	href="javascript:void(0)"> '
			+ ' 	<span class="fa fa-search"></span>' + ' </a> ';
	return content;
}

// 客户等级id转名
function custLevelFormatter(value, row, index) {
	var custLevel = row.custLevel;
	var content = '';
	if (custLevel == '1') {
		content = '普通客户';
	} else if (custLevel == '2') {
		content = '重点开发客户';
	} else if (custLevel == '3') {
		content = '大客户';
	} else if (custLevel == '4') {
		content = '合作伙伴';
	} else if (custLevel == '5') {
		content = '战略合作伙伴';
	}
	return content;
}

// 客户状态id转名
function custStatusFormatter(value, row, index) {
	var custStatus = row.custStatus;
	var content = custStatus + "--" + row.ordCount + '--' + row.ordMonth;
	if (custStatus == '1' && row.ordCount > 0 && row.ordMonth <= 6) {
		content = '正常';
	} else if (custStatus == '1' && row.ordCount > 0 && row.ordMonth > 6) {
		content = '最后订单超过6个月';
	} else if (custStatus == '1' && row.ordCount == 0) {
		content = '没有订单';
	} else if (custStatus == '0') {
		content = '流失';
	}
	return content;
}

// 修改确认
function updateStatusConfig(id) {
	var dial = dialog({
		title : '确认恢复正常',
		content : '确认这个客户恢复正常吗？',
		okValue : '确定',
		ok : function() {
			updateStatus(id);
		},
		cancelValue : '取消',
		cancel : function() {
		}
	});
	dial.showModal();
};

/**
 * 修改
 */
var updateStatus = function(id) {
	showModal("正在恢复中...");
	$.ajax({
		type : "POST",
		url : getContextPath() + "/data/success.json",
		data : {
			custId : id
		},
		dataType : 'json',
		beforeSend : function() {
		},
		error : function() {
			showAlert("恢复正常出现错误");
		},
		success : function(data) {
			hideModal();// 关闭等待条
			if (data.RET_CODE == 'success') {
				showAlert("恢复成功！");
				$('#listTable').bootstrapTable('selectPage', 1);
			} else {
				showAlert("恢复失败！");
			}
		}
	});
};

/**
 * 初始化客户经理下拉框
 */
var initCustManagerIdSelect = function() {
	$.ajax({
		type : "POST",
		url : getContextPath() + "/data/user/userCustomerManagerList.json",
		data : {},
		dataType : 'json',
		async : false,
		beforeSend : function() {
		},
		error : function() {
			showAlert("查询出现错误");
		},
		success : function(data) {
			$('#custManagerId').empty();
			var content = '<option value="">请选择</option>';
			for (var i = 0; i < data.list.length; i++) {
				content += '<option value="' + data.list[i].userId + '">'
						+ data.list[i].realName + '</option>';
			}
			$('#custManagerId').append(content);
		}
	});
};