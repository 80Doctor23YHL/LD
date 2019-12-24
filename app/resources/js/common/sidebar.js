/**
 * 菜单
 */
document
		.write('<aside id="left-panel">'
				+ '	<div class="login-info">'
				+ '		<span> <a href="javascript:void(0);" id="show-shortcut"'
				+ '			data-action="toggleShortcut"> <span></span>'
				+ '		</a>'
				+ '		</span>'
				+ '	</div>'
				+ '	<nav>'
				+ '		<ul>'
				+ '			<li><a href="#"><i class="fa fa-lg fa-fw fa-delicious"></i>'
				+ '					<span class="menu-item-parent">我的面板</span></a>'
				+ '				<ul>'
				+ '					<li id="panelUserInfo"><a href="../panel/userInfo.html">用户信息</a></li>'
				+ '					<li id="panelPasswordUpdate"><a href="../panel/passwordUpdate.html">修改密码</a></li>'
				+ '				</ul></li>'
				+ '			<li><a href="#"><i class="fa fa-lg fa-fw fa-file-text"></i>'
				+ '					<span class="menu-item-parent">营销管理</span></a>'
				+ '				<ul>'
				+ '					<li id="saleChanceList"><a href="../salechance/saleChanceList.html">销售机会管理</a></li>'
				+ '					<li id="planSaleChanceList"><a href="../plan/saleChanceList.html">开发计划管理</a></li>'
				+ '				</ul></li>'
				+ '			<li><a href="#"><i class="fa fa-lg fa-fw fa-user"></i> <span'
				+ '					class="menu-item-parent">客户管理</span></a>'
				+ '				<ul>'
				+ '					<li id="customerList"><a href="../customer/customerList.html">客户资料管理</a></li>'
				+ '					<li id="customerLostList"><a href="../customerlost/customerLostList.html">客户流失管理</a></li>'
				+ '				</ul></li>'
				+ '			<li><a href="#"><i class="fa fa-lg fa-fw fa-qrcode"></i> <span'
				+ '					class="menu-item-parent">服务管理</span></a>'
				+ '				<ul>'
				+ '					<li id="serviceList"><a href="../service/serviceList.html">服务维护</a></li>'
				+ '					<li id="serviceDueList"><a href="../servicedue/serviceDueList.html">服务分配</a></li>'
				+ '					<li id="serviceDealList"><a href="../servicedeal/serviceDealList.html">服务处理 </a></li>'
				+ '					<li id="serviceSatisfyList"><a href="../servicesatisfy/serviceSatisfyList.html">服务反馈 </a></li>'
				+ '					<li id="serviceInfoList"><a href="../serviceinfo/serviceInfoList.html">服务归档</a></li>'
				+ '				</ul></li>'
				+ '			<li><a href="#"><i class="fa fa-lg fa-fw fa-bar-chart-o"></i>'
				+ '					<span class="menu-item-parent">统计报表</span></a>'
				+ '				<ul>'
				+ '					<li id="orderReport"><a href="../report/orderReport.html">客户贡献报表</a></li>'
				+ '					<li id="customerReport"><a href="../report/customerReport.html">客户构成报表</a></li>'
				+ '					<li id="serviceReport"><a href="../report/serviceReport.html">客户服务报表</a></li>'
				+ '					<li id="customerLostReport"><a href="../report/customerLostReport.html">客户增减报表</a></li>'
				+ '				</ul></li>'
				+ '			<li><a href="#"><i class="fa fa-lg fa-fw fa-cog"></i> <span'
				+ '					class="menu-item-parent">系统管理</span></a>'
				+ '				<ul>'
				+ '					<li id="userList"><a href="../user/userList.html">用户管理</a></li>'
				+ '				</ul></li>' + '		</ul>' + '	</nav>'
				+ '	<span class="minifyme" data-action="minifyMenu"> <i'
				+ '		class="fa fa-arrow-circle-left hit"></i>' + '	</span>'
				+ '</aside>');

// 设置菜单选中样式
var p = document.location.pathname;
if (p.indexOf("/panel/userInfo.html") > 0) {
	document.getElementById("panelUserInfo").setAttribute("class", "active");
} else if (p.indexOf("/panel/passwordUpdate.html") > 0) {
	document.getElementById("panelPasswordUpdate").setAttribute("class",
			"active");
} else if (p.indexOf("/salechance/") > 0) {
	document.getElementById("saleChanceList").setAttribute("class", "active");
} else if (p.indexOf("/plan/") > 0) {
	document.getElementById("planSaleChanceList").setAttribute("class",
			"active");
} else if (p.indexOf("/customer/") > 0 || p.indexOf("/contact/") > 0
		|| p.indexOf("/communication/") > 0 || p.indexOf("/order/") > 0) {
	document.getElementById("customerList").setAttribute("class", "active");
} else if (p.indexOf("/customerlost/") > 0) {
	document.getElementById("customerLostList").setAttribute("class", "active");
} else if (p.indexOf("/service/") > 0) {
	document.getElementById("serviceList").setAttribute("class", "active");
} else if (p.indexOf("/servicedue/") > 0) {
	document.getElementById("serviceDueList").setAttribute("class", "active");
} else if (p.indexOf("/servicedeal/") > 0) {
	document.getElementById("serviceDealList").setAttribute("class", "active");
} else if (p.indexOf("/servicesatisfy/") > 0) {
	document.getElementById("serviceSatisfyList").setAttribute("class",
			"active");
} else if (p.indexOf("/serviceinfo/") > 0) {
	document.getElementById("serviceInfoList").setAttribute("class", "active");
} else if (p.indexOf("/report/orderReport.html") > 0) {
	document.getElementById("orderReport").setAttribute("class", "active");
} else if (p.indexOf("/report/customerReport.html") > 0) {
	document.getElementById("customerReport").setAttribute("class", "active");
} else if (p.indexOf("/report/serviceReport.html") > 0) {
	document.getElementById("serviceReport").setAttribute("class", "active");
} else if (p.indexOf("/report/customerLostReport.html") > 0) {
	document.getElementById("customerLostReport").setAttribute("class",
			"active");
} else if (p.indexOf("/user/") > 0) {
	document.getElementById("userList").setAttribute("class", "active");
}