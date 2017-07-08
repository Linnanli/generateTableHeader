var generateTableHeader = {
	row:0,
	column:0,
	resultData:[],
	generate:function(data,isGenerateDOM){
		if(!data || !data[0]){
			throw new Error("请传入一个数组对象");
		};
		
		this.data = data;
		this.setColumn(data);
		this.initParams(data);
		this.parse(data);
		return this.render(isGenerateDOM);
	},
	setColumn:function(data){
		this.column = data.length;
	},//设置表头最大行数
	setRow:function(row){
		this.row = row;
	},//初始化参数
	initParams:function(data){
		var rowArr = [];
		(function getItemMaxNumber(node,depth,markStr){
			for(var i = 0;i<node.length;i++){
				node[i].colspan = 1;
				//给当前数据位置打上坐标
				node[i].mark = markStr?markStr+'-'+i:''+i;
				node[i].depth = depth;
				if(node[i].childNode&&node[i].childNode.length>0){
					getItemMaxNumber(node[i].childNode,depth+1,node[i].mark);
				}else{
					rowArr.push(depth);
				}
				
			}
		})(data,1,'');

		this.setRow(Math.max.apply(null,rowArr));
	},
	parse:function(data){
		var self = this;
		//node表示数据节点,表格头结构深度depth,markStr表示数据当前在数据中的坐标
		(function setNodeParams(node){
			for(var i = 0;i<node.length;i++){
				//如果有子节点继续递归调用,没有子节点代表已经到数据树的节点末尾
				if(node[i].childNode&&node[i].childNode.length>0){
					node[i].rowspan = 1;
					setNodeParams(node[i].childNode);
				}else{
					if(node[i].depth == self.row){
						node[i].rowspan = 1;
					}else if(node[i].depth < self.row){
						node[i].rowspan = (self.row-node[i].depth)+1;
					}
					
					if(node[i].depth>1){
						var parentMark = self._getParentMark(node[i].mark);
						var parentNode = self._getMarkData(parentMark);
						_setParentColspan(parentNode,node[i]);
					}
					
				}
				//将数据排序成可被渲染的格式
				for(var j = 0;j<self.row;j++){
					if(!(self.resultData[j] instanceof Array))
						self.resultData[j] = [];

					if(j == node[i].depth-1){
						self.resultData[j].push(node[i]);
					}
				}

			}
		})(data);

		//设置父级所占列数
		function _setParentColspan(parentNodes,nodes){
			if(parentNodes.colspan>1&&nodes.depth == self.row)return;
			var colspan = 0;
			for(var i=0;i<parentNodes.childNode.length;i++){
				colspan+=parentNodes.childNode[i].colspan;
			}
			parentNodes.colspan = colspan;
			var parentMark = self._getParentMark(parentNodes.mark);
			var parentNode = self._getMarkData(parentMark);
			if(parentMark != parentNodes.mark){
				_setParentColspan(parentNode,parentNodes);
			}
		}; 
	},
	render:function(isGenerateDOM){
		var data = this.resultData;
		var resultStr = '';
		var thead = null;
		for(var i = 0;i<data.length;i++){
			resultStr += '<tr>';
			for(var j =0;j<data[i].length;j++){
				var colspan = data[i][j].colspan>1?'colspan="'+data[i][j].colspan+'"':'';
				var rowspan = data[i][j].rowspan>1?'rowspan="'+data[i][j].rowspan+'"':'';
				resultStr+='<th '+colspan+' '+rowspan+'>'+data[i][j].title+'</th>';
			}
			resultStr += '</tr>';
		}
		if(isGenerateDOM === true){
			thead = document.createElement('thead');
			thead.innerHTML = resultStr;
		}

		return isGenerateDOM == true?thead:resultStr;
	},//获取传入标记的数据
	_getMarkData:function(mark){
		var arrStrCode = mark.indexOf('-') != -1?'['+mark.split('-').join('].childNode[')+']':'['+mark+']';
		return new Function('return this.data'+arrStrCode).apply(this);
	},//获取当前数据父级的标记
	_getParentMark:function(markStr){
		if(markStr.indexOf('-') == -1)
			return markStr;
		var arr = markStr.split('-');
		arr.splice(arr.length-1,1)
		var parentMark = arr.join('-');
		return parentMark;
	}
};
