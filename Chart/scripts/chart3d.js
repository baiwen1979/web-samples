$(function(){

	//图表列表
	var charts = [];
	
	//创建指定大小的画布对象
	var createCanvas = function(width, height) {
		var canvas = $("<canvas></canvas>");
		canvas.attr("id","chart-" + charts.length);
		canvas.attr({width:width, height: height});
		//可拖放
		canvas.draggable();
		//可调整大小
		canvas.resizable();
		return canvas;
	};
	
    //创建基于画布的图表对象	
	var createChart = function(canvas, chartType) {
		var ctx = canvas.getContext("2d");
		var chart = new Chart(ctx);
		return chart;
	};
	
	//绘制指定类型的图表
	var drawChart = function (chart,chartType) {
		switch(chartType) {
			//柱状图
			case "bar":
				chart.Bar(chartDataProvider.getData(0)[0]);
				break;
			//极地面积图
			case "area":
			    chart.PolarArea(chartDataProvider.getData(1)[0]);
				break;
			//饼图
			case "pie":
			    chart.Pie(chartDataProvider.getData(1)[1]);
				break;
			//环形图
			case "doughnut":
				chart.Doughnut(chartDataProvider.getData(1)[2]);
				break;
			//曲线图
			case "line":
			default:
			    chart.Line(chartDataProvider.getData(0)[1]);
		}
	};
	
	//更新图表
	var updateChart = function() {
		chartDataProvider.updateData();
		for (var i = 0; i < charts.length; i++) {
			drawChart(charts[i].chartObj, charts[i].type);
		}
	};
	
	//UI行为注入
	$("#update-button").click(updateChart);
	
	$(".draggable").draggable ({
		revert: true,
		deltaX: -16,
		deltaY: -16,
		proxy: function(source) {
			var proxy = $("<div class='proxy'></div>");
			proxy.html($(source).parent().html()).appendTo("body");
			return proxy;
		}		
	});
	
	$("#charts").droppable({
		accept: '.draggable',
		onDrop : function(e, source) {
			var canvas = createCanvas(300, 200);
			canvas.appendTo($(this));
			var chartType = $(source).attr("id");
			var chart = createChart(canvas.get(0), chartType);
			drawChart(chart, chartType);
			charts[charts.length] = { chartObj: chart, type: chartType };
		}
	});		
	
});
