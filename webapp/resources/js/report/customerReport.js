/**
 * 客户构成统计列表js
 */
$(document).ready(function() {

	// 模板路径
	var tplUrl = getContextPath() + "/resources/tpl/report/customerReport.tpl";

	// 引入模板
	$("#juicerDiv").load(tplUrl, function() {
		// 客户统计列表查询 根据客户等级
		getCustomerReportListByCustLevel();
		// 客户统计列表查询 根据客户信誉度
		getCustomerReportListByCustCredit();
		// 客户统计列表查询 根据客户满意度
		getCustomerReportListByCustSatisfy();
	});
});

// 客户统计列表查询 根据客户等级
var getCustomerReportListByCustLevel = function() {
	$.ajax({
		type : "POST",
		url : getContextPath() + "/data/report/customerLevelReport.json",
		data : {},
		async : true,
		dataType : 'json',
		beforeSend : function() {
			$('#custLevelReportTplDiv').html(
					"<tr><td colspan='3'>" + LOADING_SMALL + "</td></tr>");
		},
		error : function() {
			showAlert("按客户等级统计查询出现错误");
		},
		success : function(data) {

			var tpl = $('#custLevelReportTpl').html();
			var html = juicer(tpl, data);
			$("#custLevelReportTplDiv").html(html);

			$("a").popover({
				trigger : 'hover'
			});
		}
	});
};

// 客户统计列表查询 根据客户信誉度
var getCustomerReportListByCustCredit = function() {
	var prjId = $("#prjId").val();
	$.ajax({
		type : "POST",
		url : getContextPath() + "/data/report/customerCreditReport.json",
		data : {},
		async : true,
		dataType : 'json',
		beforeSend : function() {
			$('#custCreditReportTplDiv').html(
					"<tr><td colspan='3'>" + LOADING_SMALL + "</td></tr>");
		},
		error : function() {
			showAlert("按客户信用度统计查询出现错误");
		},
		success : function(data) {

			var tpl = $('#custCreditReportTpl').html();
			var html = juicer(tpl, data);
			$("#custCreditReportTplDiv").html(html);

			$("a").popover({
				trigger : 'hover'
			});
		}
	});
};

// 客户统计列表查询 根据客户满意度
var getCustomerReportListByCustSatisfy = function() {
	var prjId = $("#prjId").val();
	$.ajax({
		type : "POST",
		url : getContextPath() + "/data/report/customeSatisfyReport.json",
		data : {
			prjId : prjId
		},
		async : true,
		dataType : 'json',
		beforeSend : function() {
			$('#custSatisfyReportTplDiv').html(
					"<tr><td colspan='3'>" + LOADING_SMALL + "</td></tr>");
		},
		error : function() {
			showAlert("按客户满意度统计查询出现错误");
		},
		success : function(data) {

			var tpl = $('#custSatisfyReportTpl').html();
			var html = juicer(tpl, data);
			$("#custSatisfyReportTplDiv").html(html);

			$("a").popover({
				trigger : 'hover'
			});
		}
	});
};
