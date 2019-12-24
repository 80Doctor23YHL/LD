/**
 * 销售机会指派修改js
 */
$(document).ready(function() {

	// 初始化客户经理下拉框
	initCustManagerIdSelect();

	// 初始化form
	initForm();
});

/**
 * 初始化form
 */
function initForm() {
	// 设置修改from
	setUpdateFrom();

	// 绑定保存按钮
	$('#updateBtn').click(function() {
		var url = getContextPath() + "/data/success.json";
		$("#updateForm").attr("action", url);
		$("#updateForm").submit();
	});

}

// 设置修改form
function setUpdateFrom() {
	var $updateForm = $("#updateForm").validate({
		rules : {
			dueToUserId : {
				required : true
			}
		},
		messages : {
			dueToUserId : {
				required : '指派人不可以为空'
			}
		},
		submitHandler : function(form) {
			showModal("正在保存中...");
			$(form).ajaxSubmit({
				dataType : 'json',
				success : function(data) {
					hideModal();// 关闭等待条
					if (data.RET_CODE == 'success') {
						var url = "/page/salechance/saleChanceList.html";
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
			$('#dueToUserId').empty();
			var content = '<option value="">请选择</option>';
			for (var i = 0; i < data.list.length; i++) {
				content += '<option value="' + data.list[i].userId + '">'
						+ data.list[i].realName + '</option>';
			}
			$('#dueToUserId').append(content);
		}
	});
};