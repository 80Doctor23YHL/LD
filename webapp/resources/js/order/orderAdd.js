/**
 * 订单添加js
 */
$(document).ready(
		function() {

			// 初始化form
			initForm();

			// 初始化日期控件
			$('#ordDate').datepicker(
					{
						dateFormat : 'yy-mm-dd',
						changeYear : true,
						changeMonth : true,
						monthNamesShort : [ '一月', '二月', '三月', '四月', '五月', '六月',
								'七月', '八月', '九月', '十月', '十一月', '十二月' ],
						dayNamesMin : [ '日', '一', '二', '三', '四', '五', '六' ],
						prevText : '<i class="fa fa-chevron-left"></i>',
						nextText : '<i class="fa fa-chevron-right"></i>'
					});
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
			ordDate : {
				required : true
			},
			ordPrice : {
				required : true,
				digits : true
			}
		},
		messages : {
			ordDate : {
				required : '订单日期不可以为空'
			},
			ordPrice : {
				required : '订单金额不可以为空',
				digits : '订单金额必须为整数'
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
						var url = "/page/order/orderList.html";
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