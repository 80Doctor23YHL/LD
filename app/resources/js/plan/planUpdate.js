/**
 * 开发计划添加js
 */
$(document).ready(
		function() {

			// 初始化form
			initForm();

			// 初始化日期控件
			$('#planDate').datepicker(
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
			planDate : {
				required : true
			},
			planToDo : {
				required : true
			},
			planResult : {
				required : true
			}
		},
		messages : {
			planDate : {
				required : '计划时间不可以为空'
			},
			planToDo : {
				required : '计划内容不可以为空'
			},
			planResult : {
				required : '计划执行结果不可以为空'
			}
		},
		submitHandler : function(form) {
			showModal("正在保存中...");
			$(form).ajaxSubmit({
				dataType : 'json',
				success : function(data) {
					hideModal();// 关闭等待条
					if (data.RET_CODE == 'success') {
						var chanceId = $("#chanceId").val();
						var url = "/page/plan/planList.html";
						url = url + "?chanceId=" + chanceId;
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