/**
 * 销售机会添加js
 */
$(document).ready(function() {

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
			customerName : {
				required : true,
				maxlength : 30
			},
			title : {
				required : true,
				maxlength : 50
			},
			chanceRate : {
				required : true,
				digits : true,
				max : 100
			},
			contact : {
				required : true
			},
			telNumber : {
				required : true,
				digits : true,
				minlength : 11,
				maxlength : 11
			},
			chanceDesc : {
				required : true
			}
		},
		messages : {
			customerName : {
				required : '客户名称不可以为空',
				maxlength : '客户名称长度不可以大于30个字'
			},
			title : {
				required : '概要不可以为空',
				maxlength : '概要长度不可以大于30个字'
			},
			chanceRate : {
				required : '成功几率不可以为空',
				digits : '成功几率必须为整数',
				max : '成功几率必须小于等于100'
			},
			contact : {
				required : '联系人不可以为空'
			},
			telNumber : {
				required : '联系人电话不可以为空',
				digits : '联系人电话必须为11位整数',
				minlength : '联系人电话必须为11位整数',
				maxlength : '联系人电话必须为11位整数'
			},
			chanceDesc : {
				required : '机会描述不可以为空'
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