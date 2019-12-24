/**
 * 服务反馈处理js
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
			serResult : {
				required : true
			},
			serSatisfy : {
				required : true
			}
		},
		messages : {
			serResult : {
				required : '服务反馈结果不可以为空'
			},
			serSatisfy : {
				required : '满意度不可以为空'
			}
		},
		submitHandler : function(form) {
			showModal("正在保存中...");
			$(form).ajaxSubmit({
				dataType : 'json',
				success : function(data) {
					hideModal();// 关闭等待条
					if (data.RET_CODE == 'success') {
						var url = "/page/servicesatisfy";
						url = url + "/serviceSatisfyList.html";
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