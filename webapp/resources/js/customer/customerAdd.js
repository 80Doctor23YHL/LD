/**
 * 客户添加js
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
			custName : {
				required : true,
				maxlength : 30
			},
			custRegion : {
				required : true
			},
			custManagerId : {
				required : true
			},
			custLevel : {
				required : true
			},
			custTel : {
				required : true,
				digits : true
			},
			custZip : {
				digits : true
			},
			custFax : {
				digits : true
			},
			custWebsite : {
				url : true
			},
			custLicenceNo : {
				digits : true
			},
			custBankroll : {
				number : true
			},
			custTurnover : {
				number : true
			},
			custBankAccount : {
				digits : true
			},
			custlocalTaxNo : {
				digits : true
			},
			custNationalTaxNo : {
				digits : true
			}
		},
		messages : {
			custName : {
				required : '客户名称不可以为空',
				maxlength : '客户名称长度不可以大于30个字'
			},
			custRegion : {
				required : '客户地区不可以为空'
			},
			custManagerId : {
				required : '客户经理不可以为空'
			},
			custLevel : {
				required : '客户等级不可以为空'
			},
			custTel : {
				required : '电话不可以为空',
				digits : '电话必须为数字'
			},
			custZip : {
				digits : '邮政编码必须为数字'
			},
			custFax : {
				digits : '传真必须为数字'
			},
			custWebsite : {
				url : '请输入正确格式的网址'
			},
			custLicenceNo : {
				digits : '营业执照注册号必须为数字'
			},
			custBankroll : {
				number : '注册资金必须为数字'
			},
			custTurnover : {
				number : '年营业额必须为数字'
			},
			custBankAccount : {
				digits : '银行帐号必须为数字'
			},
			custlocalTaxNo : {
				digits : '地税登记号必须为数字'
			},
			custNationalTaxNo : {
				digits : '国税登记号必须为数字'
			}
		},
		submitHandler : function(form) {
			showModal("正在保存中...");
			$(form).ajaxSubmit({
				dataType : 'json',
				success : function(data) {
					hideModal();// 关闭等待条
					if (data.RET_CODE == 'success') {
						var url = "/page/customer/customerList.html";
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
			$('#custManagerId').empty();
			var content = '<option value="">请选择</option>';
			for (var i = 0; i < data.list.length; i++) {
				content += '<option value="' + data.list[i].userId + '">'
						+ data.list[i].realName + '</option>';
			}
			$('#custManagerId').append(content);
		}
	});
};