/**
 * 用户添加js
 */
$(document).ready(function() {

	// form增加校验
	jQuery.validator.addMethod("isUserName", function(value, element, param) {
		var regu = /^[0-9a-zA-Z]*$/g;
		return regu.test(value);
	}, "用户名只可以包含字母和数字");

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
			userName : {
				required : true,
				isUserName : true,
				minlength : 6,
				maxlength : 30
			},
			realName : {
				required : true,
				maxlength : 30
			},
			email : {
				email : true,
				maxlength : 50
			}
		},
		messages : {
			userName : {
				required : '用户名不可以为空',
				minlength : '用户名长度不可以小于6个字',
				maxlength : '用户名长度不可以超过100个字'
			},
			realName : {
				required : '真实姓名不可以为空',
				maxlength : '真实姓名长度不可以超过30个字'
			},
			email : {
				email : '邮箱格式不正确',
				maxlength : '邮箱长度不可以超过50个字'
			}
		},
		submitHandler : function(form) {
			showModal("正在保存中...");
			$(form).ajaxSubmit({
				dataType : 'json',
				success : function(data) {
					hideModal();// 关闭等待条
					if (data.RET_CODE == 'success') {
						var url = "/page/user/userList.html";
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