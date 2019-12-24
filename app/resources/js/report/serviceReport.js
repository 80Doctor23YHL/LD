/**
 * 客户服务报表js
 */
$(document).ready(function() {

	// 模板路径
	var tplUrl = getContextPath() + "/resources/tpl/report/serviceReport.tpl";

	// 引入模板
	$("#juicerDiv").load(tplUrl, function() {

		// 服务统计列表
		getServiceReportList();
		// 绑定查询按钮
		$('#queryBtn').click(function() {
			// 服务统计列表
			getServiceReportList();
		});

	});

});

// 服务统计列表
var getServiceReportList = function() {
	var year = $("#year").val();
	$.ajax({
		type : "POST",
		url : getContextPath() + "/data/report/serviceReport.json",
		data : {
			'year' : year
		},
		async : true,
		dataType : 'json',
		beforeSend : function() {
			$('#serviceReportTplDiv').html(
					"<tr><td colspan='3'>" + LOADING_SMALL + "</td></tr>");
		},
		error : function() {
			showAlert("服务统计列表查询出现错误");
		},
		success : function(data) {

			var tpl = $('#serviceReportTpl').html();
			var html = juicer(tpl, data);
			$("#serviceReportTplDiv").html(html);

			$("a").popover({
				trigger : 'hover'
			});
		}
	});
};
