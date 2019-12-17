/**
 * 客户列表js
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
			params.custRegion = $("#custRegion").val();
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
		// 联系人
		'click .contact' : function(e, value, row, index) {
			location.href = getContextPath()
					+ '/page/contact/contactList.html?custId=' + row.custId;
		},
		// 交往记录
		'click .communication' : function(e, value, row, index) {
			location.href = getContextPath()
					+ '/page/communication/communicationList.html?custId='
					+ row.custId;
		},
		// 历史订单
		'click .order' : function(e, value, row, index) {
			location.href = getContextPath()
					+ '/page/order/orderList.html?custId=' + row.custId;
		},
		// 修改
		'click .edit' : function(e, value, row, index) {
			location.href = getContextPath()
					+ '/page/customer/customerUpdate.html?custId=' + row.custId;
		},
		// 详情
		'click .info' : function(e, value, row, index) {
			location.href = getContextPath()
					+ '/page/customer/customerInfo.html?custId=' + row.custId;
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
	var content = ' <a class="contact btn btn-xs btn-primary" rel="popover-hover" '
			+ ' 	data-placement="top" data-content="联系人" '
			+ ' 	href="javascript:void(0)"> '
			+ ' 	<span class="fa fa-user"></span> '
			+ ' </a> '
			+ ' <a class="communication btn btn-xs btn-primary" rel="popover-hover" '
			+ ' 	data-placement="top" data-content="交往记录" '
			+ ' 	href="javascript:void(0)"> '
			+ ' 	<span class="fa fa-align-left"></span> '
			+ ' </a> '
			+ ' <a class="order btn btn-xs btn-primary" rel="popover-hover" '
			+ ' 	data-placement="top" data-content="历史订单" '
			+ ' 	href="javascript:void(0)"> '
			+ ' 	<span class="fa fa-file-text-o"></span> '
			+ ' </a> '
			+ ' <a class="edit btn btn-xs btn-primary" '
			+ ' 	rel="popover-hover" data-placement="top" data-content="编辑" '
			+ ' 	href="javascript:void(0)"> '
			+ ' 	<span class="fa fa-pencil"></span> '
			+ ' </a> '
			+ ' <a class="info btn btn-xs btn-default" '
			+ ' 	rel="popover-hover" data-placement="top" data-content="查看" '
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