<!-- 客户服务报表 模板 -->
<script id="serviceReportTpl" type="text/template">
{@if list!=null && list.length > 0}
	{@each list as obj}
		<tr>
			<td style="padding-left:50px;">
				<a style="color:#333;overflow:hidden;" rel="popover-hover" 
					data-placement="top" data-content=""> 
					{@if obj.serType=='1'}
						咨询
					{@else if obj.serType=='2'}
						建议
					{@else if obj.serType=='3'}
						投诉
					{@else if obj.serType=='4'}
						其它
					{@/if}
				</a>
			</td>
			<td>!{obj.serviceCount}</td>
			<td>!{obj.serviceRate}%</td>
		</tr>
	{@/each}
{@else}
	<tr>
		<td colspan="2" style="color:#999999" >	
			<i class="fa-fw fa fa-warning"></i> 暂无服务
		</td>
	</tr>	
{@/if}
</script>