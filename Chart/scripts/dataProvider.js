//图表数据提供者对象，目前的实现使用随机数作为图表数据
//将来使用AJAX技术重写getData和updateData方法便可使用业
//务数据更新图表
var chartDataProvider = {
	//私有属性：样本数据
	_sampleData: [],
	
	//私有方法：返回[from,to]之间的随机数
	_getRandomNumber: function (from, to) {
		var rnd = Math.random();
		var range = Math.abs(to - from) + 1;
		from = Math.min(from, to);
		return Math.floor(rnd * range) + from;
	},
	
	//私有方法：使用随机数更新数组中的元素
	_updateObjects: function (objects, propertName) {
		for (var i = 0; i < objects.length; i++) {
			var rnd = this._getRandomNumber(10, 100);
			if (propertName) {
				objects[i][propertName] = rnd;
			}
			else {
				objects[i] = rnd;
			}
		}
	},
	
	//公有方法：更新数据
	updateData: function () {
		for (var i = 0; i < this._sampleData[0].length; i++) {
			for (var j = 0; j < this._sampleData[0][i].datasets.length; j++) {
				this._updateObjects(this._sampleData[0][i].datasets[j].data);
			}
		}
		
		for (var i = 0; i < this._sampleData[1].length; i++) {
			this._updateObjects(this._sampleData[1][i], "value");
		}
	},
	
	//公有方法：获取图表数据
	getData : function (chartTypeId) {
        
		if (chartTypeId < 0 || chartTypeId > 1) chartTypeId = 0;				
		//样本数据
		this._sampleData [0] = [
		{
			labels: ["一月", "二月", "三月", "四月", "五月", "六月", "七月"],
			datasets: [
			{
				fillColor: "rgba(220,220,220,0.5)",
				strokeColor: "rgba(220,220,220,1)",
				pointColor: "rgba(220,220,220,1)",
				pointStrokeColor: "#fff",
				data: [0, 0, 0, 0, 0, 0, 0]
			},
			{
				fillColor: "rgba(151,187,205,0.5)",
				strokeColor: "rgba(151,187,205,1)",
				pointColor: "rgba(151,187,205,1)",
				pointStrokeColor: "#fff",
				data: [0, 0, 0, 0, 0, 0, 0]
			}]
		},
		{
			labels: ["吃饭", "睡觉", "喝水", "设计", "编码", "开会"],
			datasets: [
			{
				fillColor: "rgba(220,220,220,0.5)",
				strokeColor: "rgba(220,220,220,1)",
				pointColor: "rgba(220,220,220,1)",
				pointStrokeColor: "#fff",
				data: [0, 0, 0, 0, 0, 0]
			},
			{
				fillColor: "rgba(151,187,205,0.5)",
				strokeColor: "rgba(151,187,205,1)",
				pointColor: "rgba(151,187,205,1)",
				pointStrokeColor: "#fff",
				data: [0, 0, 0, 0, 0, 0]
			}]
		}];
	
		this._sampleData[1] = [
		[
		    {value: 0, color: "#D97041"}, {value: 0, color: "#C7604C"},
			{value: 0, color: "#21323D"}, {value: 0, color: "#9D9B7F"},
			{value: 0, color: "#7D4F6D"}, {value: 0, color: "#584A5E"}
		],
		[
		    {value: 0, color: "#F38630"}, {value: 0, color: "#E0E4CC"}, 
			{value: 0, color: "#69D2E7"}			
		],
		[
		    {value: 0, color: "#F7464A"}, {value: 0, color: "#E2EAE9"},
			{value: 0, color: "#D4CCC5"}, {value: 0, color: "#949FB1"}, 
			{value: 0, color: "#4D5360"}
		]
		];
		
		this.updateData();		
		return this._sampleData[chartTypeId];
	}

	
};