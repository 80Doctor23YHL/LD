/**
 * 联系人添加js
 */
$(document).ready(function() {

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
			contactName : {
				required : true,
				maxlength : 30
			},
			phone : {
				required : true,
				digits : true
			},
			mobile : {
				digits : true,
				minlength : 11,
				maxlength : 11
			}
		},
		messages : {
			contactName : {
				required : '姓名不可以为空',
				maxlength : '姓名长度不可以超过30个字'
			},
			phone : {
				required : '办公电话不可以为空',
				digits : '办公电话必须为整数'
			},
			mobile : {
				digits : '手机必须为整数',
				minlength : '手机长度必须为11位',
				maxlength : '手机长度必须为11位'
			}
		},
		submitHandler : function(form) {
			showModal("正在保存中...");
			$(form).ajaxSubmit({
				dataType : 'json',
				success : function(data) {
					hideModal();// 关闭等待条
					if (data.RET_CODE == 'success') {
						var custId = $("#custId").val();
						var url = "/page/contact/contactList.html";
						url = url + "?custId=" + custId;
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