# generateTableHeader version 1.0.0

  generateTableHeader是一个使用数据动态生成表格头部的小型生成器。

  依靠解析数据格式设置单元格所占行和列，对表头进行排版。

  [查看DEMO]( https://linnanli.github.io/generateTableHeader/)

  # generateTableHeader遵循的数据格式

  以下是我测试使用的数据格式：

  ```javascript
  var headerData = [
	{
	title:'区域',
	name:'test1',
	width:null,
	height:null,
	childNode:[]
},{
	title:'智慧物联网网关',
	childNode:[{
		title:'固定无线网关',
		childNode:[{
			title:'在线',
			name:'test2',
			width:null,
			height:null
		},{
			title:'离线',
			name:'test3',
			width:null,
			height:null
		},{
			title:'维修',
			name:'test4',
			width:null,
			height:null
		},{
			title:'挂起',
			name:'test5',
			width:null,
			height:null
		},{
			title:'在线率',
			name:'test6',
			width:null,
			height:null
		},{
			title:'总数',
			name:'test7',
			width:null,
			height:null
		}]
	},{
		title:'稽查网关',
		childNode:[{
			title:'岗亭',
			name:'test2',
			width:null,
			height:null
		},{
			title:'离线',
			name:'test2',
			width:null,
			height:null
		},{
			title:'总数',
			name:'test2',
			width:null,
			height:null
		}]
	}]
},{
	title:'登记车辆',
	childNode:[{
		title:'昨日安装量',
		name:'test2',
		width:null,
		height:null
	},{
		title:'今日安装量',
		name:'test2',
		width:null,
		height:null
	},{
		title:'总数',
		name:'test2',
		width:null,
		height:null
	}]
},{
	title:'登记点',
	childNode:[{
		title:'登记点数量',
		name:'test2',
		width:null,
		height:null
	},{
		title:'销售商数量',
		name:'test2',
		width:null,
		height:null
	}]
}];
```