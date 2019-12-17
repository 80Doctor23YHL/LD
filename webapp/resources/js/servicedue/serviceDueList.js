/**
 * 服务分配列表js
 */

var userList;// 客户经理列表

$(document).ready(function() {
	// 获取客户经理列表
	getUserList();
});

// 初始化列表
function initTable() {
	// 初始化列表
	var table = $('#listTable').bootstrapTable({
		url : getContextPath() + '/data/service/serviceDueList.json',
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

// 分配列格式化
function serDueIdFormatter(value, row, index) {
	var serDueId = row.serDueId;
	var content = ' <select name="serDueId" style="width:100%;border:1px solid #ccc;padding:2px 2px 2px 12px;" '
			+ 'onchange="updateDueId(\''
			+ row.serId
			+ '\','
			+ 'this.value)"> '
			+ ' <option value="">请选择</option> ';
	if (userList != null && userList.length > 0) {
		for (var i = 0; i < userList.length; i++) {
			var selected = "";
			if (userList[i].userId == serDueId) {
				selected = "selected"
			}
			content += '<option value="' + userList[i].userId + '" ' + selected
					+ '>' + userList[i].realName + '</option>';
		}
	}
	content += ' </select> ';
	return content;
}

/**
 * 客户经理列表
 */
var getUserList = function() {
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
			// 客户经理列表
			userList = data.list;
			// 初始化列表
			initTable();
		}
	});
};

/**
 * 分配
 */
function updateDueId(serId, serDueId) {
	showModal("正在分配中...");
	$.ajax({
		type : "POST",
		url : getContextPath() + "/data/success.json",
		data : {
			serId : serId,
			serDueId : serDueId
		},
		dataType : 'json',
		beforeSend : function() {
		},
		error : function() {
			hideModal();// 关闭等待条
			showAlert("分配出现错误");
		},
		success : function(data) {
			hideModal();// 关闭等待条
			if (data.RET_CODE == 'success') {
				showAlert("分配成功！");
			} else {
				showAlert("分配失败！");
			}
		}
	});
};
