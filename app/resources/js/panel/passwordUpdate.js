/**
 * 修改密码js
 */

// 提示信息
var emsg = "<i class='fa-fw fa fa-warning'></i> ";
var smsg = "<i class='fa fa-check'></i> ";

// init
$(function() {
	// 初始化修改密码
	initPasswordUpdateForm();

	// 情况提示信息
	$("input").focus(function() {
		$("#tipInfo").html("");
	});

});

/**
 * 初始化form
 */
function initPasswordUpdateForm() {
	// 设置from
	setPasswordUpdateFrom();

	// 修改密码
	$('#updateBtn').click(function() {
		$("#tipInfo").html("");
		var url = getContextPath() + "/data/success.json";
		$("#updateForm").attr("action", url);
		$("#updateForm").submit();
	});
}

// 设置form
function setPasswordUpdateFrom() {
	// 校验form
	var vform = $("#updateForm").validate({
		rules : {
			oldPassword : {
				required : true
			},
			password : {
				required : true,
				minlength : 6,
				maxlength : 20
			},
			passwordConfirm : {
				equalTo : "#password"
			}
		},
		messages : {
			oldPassword : {
				required : '请输入原密码'
			},
			password : {
				required : '请输入新密码',
				maxlength : $.validator.format("请最多输入 {0} 个字"),
				minlength : $.validator.format("请至少输入 {0} 个字"),
			},
			passwordConfirm : {
				equalTo : '确认密码与新密码不一致，请重新输入'
			}
		},
		submitHandler : function(form) {
			$(form).ajaxSubmit({
				dataType : 'json',
				success : function(data) {
					if ("success" == data.RET_CODE) {
						$("#tipInfo").removeClass("tip-error-info");
						$("#tipInfo").addClass("tip-success-info");
						$("#tipInfo").html(smsg + "密码修改成功");
					} else {
						$("#tipInfo").removeClass("tip-success-info");
						$("#tipInfo").addClass("tip-error-info");
						$("#tipInfo").html(emsg + "密码修改失败");
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
