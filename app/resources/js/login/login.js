/**
 * 登录js
 */
// init
$(function() {

	// 初始化
	initForm();

	// 情况提示信息
	$("input").focus(function() {
		$("#tipInfo").html("");
	});
});

/**
 * 初始化form
 */
function initForm() {
	// 设置from
	setFrom();

	// 登录
	$('#loginBtn').click(function() {
		var url = getContextPath() + "/data/login/login.json";
		$("#loginForm").attr("action", url);
		$("#loginForm").submit();
	});
}

// 设置form
function setFrom() {
	// 提示信息
	var emsg = "<i class='fa fa-exclamation-triangle'></i> ";

	// 校验form
	var vform = $("#loginForm").validate({
		rules : {
			userName : {
				required : true
			},
			password : {
				required : true
			}
		},
		messages : {
			userName : {
				required : '请输入用户名'
			},
			password : {
				required : '请输入密码'
			}
		},
		submitHandler : function(form) {
			$(form).ajaxSubmit({
				dataType : 'json',
				success : function(data) {
					var userName = $("#userName").val();
					var password = $("#password").val();
					var user = data.RET_OBJ;
					if (userName == user.userName && password == user.password) {
						var vurl = "/page/home/index.html";
						location.replace(getContextPath() + vurl);
					} else {
						$("#tipInfo").addClass("tip-error-info");
						$("#tipInfo").html(emsg + "用户名或密码错误");
					}
				}
			});
		},
		errorPlacement : function(error, element) {
			error.insertAfter(element.parent());
			element[0].focus();
			return false;
		}
	});
}