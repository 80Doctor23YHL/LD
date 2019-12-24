/**
 * 客户增减报表js
 */
$(document).ready(function() {

	// 模板路径
	var tplUrl = "/resources/tpl/report/customerLostReport.tpl";

	// 引入模板
	$("#juicerDiv").load(getContextPath() + tplUrl, function() {
		// 客户流失统计列表查询
		getCustomerLostReportList();
	});
});

// 客户流失统计列表查询
var getCustomerLostReportList = function() {
	$.ajax({
		type : "POST",
		url : getContextPath() + "/data/report/customerLostReport.json",
		data : {},
		async : true,
		dataType : 'json',
		beforeSend : function() {
			$('#custLostReportTplDiv').html(
					"<tr><td colspan='4'>" + LOADING_SMALL + "</td></tr>");
		},
		error : function() {
			showAlert("查询出现错误");
		},
		success : function(data) {

			var tpl = $('#custLostReportTpl').html();
			var html = juicer(tpl, data);
			$("#custLostReportTplDiv").html(html);

			$("a").popover({
				trigger : 'hover'
			});
		}
	});
};
