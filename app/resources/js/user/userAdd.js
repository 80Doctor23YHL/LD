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
			userName : {
				required : true,
				isUserName : true,
				minlength : 6,
				maxlength : 30
			},
			password : {
				required : true,
				minlength : 6,
				maxlength : 20
			},
			passwordConfirm : {
				equalTo : "#password"
			},
			realName : {
				required : true,
				maxlength : 30
			},
			roleId : {
				required : true
			}
		},
		messages : {
			userName : {
				required : '用户名不可以为空',
				minlength : '用户名长度不可以小于6个字',
				maxlength : '用户名长度不可以超过30个字'
			},
			password : {
				required : '密码不可以为空',
				minlength : '密码长度不可以小于6个字',
				maxlength : '密码长度不可以超过20个字'
			},
			passwordConfirm : {
				equalTo : '确认密码与密码不一致，请重新输入'
			},
			realName : {
				required : '真实姓名不可以为空',
				maxlength : '真实姓名长度不可以超过30个字'
			},
			roleId : {
				required : '用户角色不可以为空'
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