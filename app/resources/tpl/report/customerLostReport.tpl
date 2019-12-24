<!-- 客户增减报表 模板 -->
<script id="custLostReportTpl" type="text/template">
{@if list!=null && list.length > 0}
	{@each list as obj}
		<tr>
			<td style="padding-left:50px;">
				<a style="color:#333;overflow:hidden;" rel="popover-hover" 
					data-placement="top" data-content=""> 
					!{obj.year}
				</a>
			</td>
			<td>!{obj.total}</td>
			<td>!{obj.normal}</td>
			<td>!{obj.lost}</td>
		</tr>
	{@/each}
{@else}
	<tr>
		<td colspan="2" style="color:#999999" >	
			<i class="fa-fw fa fa-warning"></i> 暂无客户
		</td>
	</tr>	
{@/if}
</script>