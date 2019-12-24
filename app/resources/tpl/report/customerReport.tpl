<!-- 客户统计列表 根据客户等级 模板 -->
<script id="custLevelReportTpl" type="text/template">
{@if list!=null && list.length > 0}
	{@each list as obj}
		<tr>
			<td style="padding-left:50px;">
				<a style="color:#333;overflow:hidden;" rel="popover-hover" 
					data-placement="top" data-content=""> 
					{@if obj.custLevel=='1'}
						普通客户
					{@else if obj.custLevel=='2'}
						重点开发客户
					{@else if obj.custLevel=='3'}
						大客户
					{@else if obj.custLevel=='4'}
						合作伙伴
					{@else if obj.custLevel=='5'}
						战略合作伙伴
					{@/if}
				</a>
			</td>
			<td>!{obj.custCount}</td>
			<td>!{obj.custRate}%</td>
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

<!-- 客户统计列表 根据客户信誉度 模板 -->
<script id="custCreditReportTpl" type="text/template">
{@if list!=null && list.length > 0}
	{@each list as obj}
		<tr>
			<td style="padding-left:50px;">
				<a style="color:#333;overflow:hidden;" rel="popover-hover" 
					data-placement="top" data-content=""> 
					{@each i in range(0, obj.custCredit)}
					    <i class="fa fa-star"></i>
					{@/each}
				</a>
			</td>
			<td>!{obj.custCount}</td>
			<td>!{obj.custRate}%</td>
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

<!-- 客户统计列表 根据客户满意度 模板 -->
<script id="custSatisfyReportTpl" type="text/template">
{@if list!=null && list.length > 0}
	{@each list as obj}
		<tr>
			<td style="padding-left:50px;">
				<a style="color:#333;overflow:hidden;" rel="popover-hover" 
					data-placement="top" data-content=""> 
					{@each i in range(0, obj.custSatisfy)}
					    <i class="fa fa-star"></i>
					{@/each}
				</a>
			</td>
			<td>!{obj.custCount}</td>
			<td>!{obj.custRate}%</td>
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

