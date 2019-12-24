/**
 * 用户列表js
 */
$(document).ready(function() {

	// 初始化列表
	initTable();
	// 初始化from
	initForm();
});

// 已选的用户id
var userIdsSelected = [];

// 初始化列表
function initTable() {
	// 初始化列表
	var table = $('#listTable').bootstrapTable({
		url : getContextPath() + '/data/user/userList.json',
		method : 'get',
		pagination : true,
		sidePagination : 'server',
		uniqueId : 'userId',
		undefinedText : '',
		queryParams : function(params) {
			params.userName = $("#userName").val();
			params.realName = $("#realName").val();
			params.roleId = $("#roleId").val();
			params.status = $("#statusQuery").val();
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

	$('#listTable')
			.on(
					'check.bs.table check-all.bs.table uncheck.bs.table uncheck-all.bs.table',
					function(e, rows) {
						var ids = $.map(!$.isArray(rows) ? [ rows ] : rows,
								function(row) {
									return row.userId;
								}), func = $.inArray(e.type, [ 'check',
								'check-all' ]) > -1 ? 'union' : 'difference';
						userIdsSelected = _[func](userIdsSelected, ids);
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
		// 初始化密码
		'click .password' : function(e, value, row, index) {
			updatePasswordConfig(row.userId);
		},
		// 修改
		'click .edit' : function(e, value, row, index) {
			location.href = getContextPath()
					+ '/page/user/userUpdate.html?userId=' + row.userId;
		},
		// 删除
		'click .remove' : function(e, value, row, index) {
			deleteConfig(row.userId);
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
	if (row.userName != 'admin') {
		content = content
				+ ' <a class="password btn btn-xs btn-primary" '
				+ ' 	rel="popover-hover" data-placement="top" data-content="初始化密码" '
				+ ' 	href="javascript:void(0)"> '
				+ ' 	<span class="fa fa-key"></span> '
				+ ' </a> '
				+ ' <a class="edit btn btn-xs btn-primary" '
				+ ' 	rel="popover-hover" data-placement="top" data-content="编辑" '
				+ ' 	href="javascript:void(0)"> '
				+ ' 	<span class="fa fa-pencil"></span> '
				+ ' </a> '
				+ ' <a class="remove btn btn-xs btn-danger" rel="popover-hover" '
				+ ' 	data-placement="top" data-content="删除" '
				+ ' 	href="javascript:void(0)"> '
				+ ' 	<span class="fa fa-trash-o"></span> ' + ' </a> ';
	}
	return content;
}

// 角色id转角色名
function roleFormatter(value, row, index) {
	var roleId = row.roleId;
	var content = '';
	if (roleId == '1') {
		content = '客户经理';
	} else if (roleId == '2') {
		content = '销售主管';
	} else if (roleId == '3') {
		content = '高管';
	} else if (roleId == '4') {
		content = '管理员';
	}
	return content;
}

// 状态id转名
function statusFormatter(value, row, index) {
	var status = row.status;
	var content = '';
	if (status == '1') {
		content = '正常';
	} else if (status == '0') {
		content = '停用';
	}
	return content;
}

/**
 * 初始化form
 */
function initForm() {

	// 设置修改from
	setUpdateForm();

	// 绑定修改按钮
	$('#openBtn').click(function() {
		if (userIdsSelected == null || userIdsSelected.length < 1) {
			showAlert("请先选择用户，再启用");
			return;
		} else {
			var userIds = userIdsSelected.join(",");
			$("#userIds").val(userIds);
			$("#status").val("1");
			var url = getContextPath() + "/data/success.json";
			$("#updateForm").attr("action", url);
			$("#updateForm").submit();
		}

	});
	$('#closeBtn').click(function() {
		if (userIdsSelected == null || userIdsSelected.length < 1) {
			showAlert("请先选择用户，再停用");
			return;
		} else {
			var userIds = userIdsSelected.join(",");
			$("#userIds").val(userIds);
			$("#status").val("0");
			var url = getContextPath() + "/data/success.json";
			$("#updateForm").attr("action", url);
			$("#updateForm").submit();
		}
	});

}

/**
 * 设置修改form
 */
function setUpdateForm() {
	var $updateForm = $("#updateForm").validate({
		rules : {},
		messages : {},
		submitHandler : function(form) {
			showModal("正在保存中...");
			$(form).ajaxSubmit({
				dataType : 'json',
				success : function(data) {
					hideModal();// 关闭等待条
					if (data.RET_CODE == 'success') {
						userIdsSelected = null;
						showAlert("设置成功");
						$('#listTable').bootstrapTable('selectPage', 1);
					} else {
						showAlert("设置失败");
					}
				}
			});
		},
		errorPlacement : function(error, element) {
			error.insertAfter(element.parent());
			return false;
		}
	});
}

// 删除确认
function deleteConfig(id) {
	var dial = dialog({
		title : '确认删除',
		content : '确认删除这个用户吗？',
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
 * 用户删除
 */
var deleteInfo = function(id) {
	showModal("正在删除中...");
	$.ajax({
		type : "POST",
		url : getContextPath() + "/data/success.json",
		data : {
			userId : id
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

// 初始化密码确认
function updatePasswordConfig(id) {
	var dial = dialog({
		title : '确认初始化密码',
		content : '确认将这个用户密码初始化为“123456”吗？',
		okValue : '确定',
		ok : function() {
			updatePassword(id);
		},
		cancelValue : '取消',
		cancel : function() {
		}
	});
	dial.showModal();
};

/**
 * 用户密码初始化
 */
var updatePassword = function(id) {
	showModal("正在初始化中...");
	$.ajax({
		type : "POST",
		url : getContextPath() + "/data/success.json",
		data : {
			userId : id
		},
		dataType : 'json',
		beforeSend : function() {
		},
		error : function() {
			showAlert("密码初始化出现错误");
		},
		success : function(data) {
			hideModal();// 关闭等待条
			if (data.RET_CODE == 'success') {
				showAlert("密码初始化成功！");
			} else {
				showAlert("密码初始化失败！");
			}
		}
	});
};