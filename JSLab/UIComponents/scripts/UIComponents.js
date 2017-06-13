//用于根据ID来获取单个HTML元素（节点）的快捷函数
function $(id)
{
	//默认搜索上下文为document
	var context = document;
	//若用户指定特定的搜索上下文对象，则将其作为搜索上下文
	if (arguments.length > 1)
	{
		context = arguments[1];
	}
	return context.getElementById(id);
}
//用于根据类名来获取多个HTML元素（数组）的快捷函数
function C$(className)
{
	//默认搜索上下文为document
	var context = document;
	//若用户指定特定的搜索上下文对象，则将其作为搜索上下文
	if (arguments.length > 1)
	{
		context = arguments[1];
	}
	return context.getElementsByClassName(className);
}
//用于根据便签名获取多个HTML元素（数组）的快捷函数
function T$(tagName)
{
    //默认搜索上下文为document
	var context = document;
	//若用户指定特定的搜索上下文对象，则将其作为搜索上下文
	if (arguments.length > 1)
	{
		context = arguments[1];
	}
	return context.getElementsByTagName(tagName);
}
//显示HTML元素
function show(e)
{
	e.style.display = "block";
}

//隐藏HTML元素
function hide(e)
{
	e.style.display = "none";
}

//初始化UI组件
var initUIComponents = function()
{
	console.log("正在初始化UI组件...");
	
	$("btnStart").onclick = function(event)
	{
		console.log("\"开始\"按钮被点击!");
		var indicator = $("indicator");
		var percent = 0;
		var timer = setInterval(function(){ 
		
			indicator.innerHTML = percent + "%";
			indicator.style.width = percent + "%";
			
			percent += 1;
			
			if (percent > 100)
			{
				clearInterval(timer);
			}
			
		}, 100);
	};
	
	var updateClock = function()
	{
		var currentTime = new Date();
		var hour24 = currentTime.getHours();
		var hour = (hour24 > 12 ? hour24 - 12: hour24);
		var minute = currentTime.getMinutes();
		var second = currentTime.getSeconds();
		
		var hourDeg = Math.ceil(hour / 12 * 360) + "deg";
		var minuteDeg = Math.ceil(minute / 60 * 360) + "deg";
		var secondDeg = Math.ceil(second / 60 * 360) + "deg";
		
		//console.log(hourDeg + "," + minuteDeg + "," + secondDeg);
		
		var hourElement = $("hour");
		var minuteElement = $("minute");
		var secondElement = $("second");
		
		hourElement.style.webkitTransform = "rotate(" + hourDeg + ")";
		minuteElement.style.webkitTransform = "rotate(" + minuteDeg + ")";
		secondElement.style.webkitTransform = "rotate(" + secondDeg + ")";
	};
	
	setInterval(updateClock, 1000);
	
	var makeTabs = function(tabsContainer)
	{
		uls = T$("ul",tabsContainer);
		
		navList = uls[0];
		contentList = uls[1];
		
		var links = T$("a",navList);
		var navItems = T$("li", navList);
		var contents = T$("li",contentList);
		
		navList.onclick = function(event)
		{
			
			for (var i = 0; i < links.length; i++)
			{
				hide(contents[i]);
				
				var currentItem = links[i].parentNode;
				currentItem.className = "";
				
				if (links[i] == event.target 
					|| navItems[i] == event.target)
				{
					show(contents[i]);
					currentItem.className = "active";
				}
			}
			event.preventDefault();
		}
		
	}
	
	makeTabs(C$("tabs")[0]);
	
	var insertTable = function (rows, cols, tableContainer)
	{
		var table = document.createElement("table");
		for (var r = 0; r < rows; r++)
		{
			var row = document.createElement("tr");
			for (var c = 0; c < cols; c++)
			{
				var col = document.createElement("td");
				col.innerHTML = (c + r * cols) + "";
				row.appendChild(col);
			}
			table.appendChild(row);
		}
		tableContainer.appendChild(table);
		
		table.ondblclick = function(event)
		{
			console.log(event.target.innerHTML);
			var textBox = document.createElement("input");
			textBox.value = event.target.innerHTML;
			textBox.type = "text";			
			textBox.style.width = "1em";
			
			textBox.onblur = function ()
			{
				event.target.innerHTML = this.value;
				//console.log(this);
				console.log(this == textBox);
				
				this.onblur = null;				
				if (this.parentNode != null)
				{
					this.parentNode.removeChild(this);
				}
			}
			event.target.innerHTML = "";	
			event.target.appendChild(textBox);
		}
	}
	
	insertTable(3,5,$("dynamicTable"));
	
	console.log("UI组件初始化完成.");
}

initUIComponents();