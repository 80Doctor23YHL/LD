/**
 * 服务添加js
 */
$(document).ready(function() {

	// 初始化客户下拉框
	initCustIdSelect();

	// 初始化form
	initForm();
});

/**
 * 初始化form
 */
function initForm() {
	// 设置添加from
	setAddFrom();

	// 绑定保存按钮
	$('#addBtn').click(function() {
		var url = getContextPath() + "/data/success.json";
		$("#addForm").attr("action", url);
		$("#addForm").submit();
	});

}

// 设置添加form
function setAddFrom() {
	var $addForm = $("#addForm").validate({
		rules : {
			custId : {
				required : true
			},
			serType : {
				required : true
			},
			serTitle : {
				required : true,
				maxlength : 50
			},
			serRequest : {
				required : true,
				maxlength : 500
			}
		},
		messages : {
			custId : {
				required : '客户不可以为空'
			},
			serType : {
				required : '服务类型不可以为空'
			},
			serTitle : {
				required : '服务概要不可以为空',
				maxlength : '服务概要长度不可以大于50个字'
			},
			serRequest : {
				required : '服务请求内容不可以为空',
				maxlength : '服务请求内容不可以大于500个字'
			}
		},
		submitHandler : function(form) {
			showModal("正在保存中...");
			$(form).ajaxSubmit({
				dataType : 'json',
				success : function(data) {
					hideModal();// 关闭等待条
					if (data.RET_CODE == 'success') {
						var url = "/page/service/serviceList.html";
						showSuccessDial("保存成功！", getContextPath() + url);
					} else {
						showAlert(data.RET_MSG);
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

/**
 * 初始化客户下拉框
 */
var initCustIdSelect = function() {
	$.ajax({
		type : "POST",
		url : getContextPath() + "/data/customer/customerList.json",
		data : {},
		dataType : 'json',
		async : false,
		beforeSend : function() {
		},
		error : function() {
			showAlert("客户列表查询出现错误");
		},
		success : function(data) {
			$('#custId').empty();
			var content = '<option value="">请选择</option>';
			for (var i = 0; i < data.rows.length; i++) {
				content += '<option value="' + data.rows[i].custId + '">'
						+ data.rows[i].custName + '</option>';
			}
			$('#custId').append(content);
		}
	});
};