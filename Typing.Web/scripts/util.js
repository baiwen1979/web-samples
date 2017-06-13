var Util = {
	
	/****** public methods ******/	
	//返回指定id的（单个）HTML元素
	$: function(id) {		
		return this._getContext(arguments).getElementById(id);
	},
	//返回指定标签名的（多个）HTML元素
	T$: function(tagName) {
		return this._getContext(arguments).getElementsByTagName(tagName);
	},
	//返回指定类名的（多个）HTML元素
	C$: function(className) {
		return this._getContext(arguments).getElementsByClassName(className);		
	},
	
	//创建HTTP请求对象：XMLHttpRequest
	createXHR: function() {
		var xhr = null;
		
		if (window.XMLHttpRequest)
		{
		 	//for IE7+, chrome, firefox, safari and Opera
			xhr = new XMLHttpRequest(); 
		}
		else
		{
			//for IE5 and IE6
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
		
		return xhr;
	},
	
	//AJAX的GET请求方法,其中
	//url:所请求资源的URL地址
	//onsuccess:请求成功时要调用（执行）的函数
	//onfailure:请求失败时要调用（执行）的函数
	ajaxGet: function(url, onsuccess, onfailure) {
		//创建HTTP请求对象，并使用xhr表示
		var xhr = this.createXHR();
		//调用HTTP请求对象的open()方法，打开指定URL的异步HTTP GET请求
		xhr.open("GET", url);
		//发送请求
		xhr.send();
		//绑定HTTP请求对象的就绪状态改变事件处理函数
		xhr.onreadystatechange = function() {
		
			//如果收到服务器的响应，并且响应状态为OK(200)
			if (xhr.readyState == 4 && xhr.status == 200)
			{
				//如果指定的onsuccess参数为函数
				if (typeof(onsuccess) == "function")
				{
					//如果响应数据不是XML格式的
					if (xhr.responseXML == null)
					{
						//以HTTP请求对象的相应文本属性为实参调用
						//用户指定的onsuccess函数（回调函数）
						onsuccess(xhr.responseText);
					}
					else
					{
						//否则，就以响应的XML为实参调用用户指定的
						//onsuccess函数
						onsuccess(xhr.responseXML);
					}					
				}
			}
			//如果服务器为找到请求的资源(404)
			else if (xhr.status == 404)
			{
				
				if (typeof(onfailure) == "function")
				{
					//调用请求失败时，对应的回调函数
					onfailure();
				}
			}
		}
	}
	,
	
	//AJAX 加载方法：将指定URL的内容加载到指定ID的HTML元素中
	//url: 所请求资源的URL地址
	//containerId: 要更新其内容的HTML元素的id属性值
	//onfailure: 请求失败是，要调用（执行）的回调函数
	load: function(url, containerId, onfailure) {
		var container = this.$(containerId);
		
		this.ajaxGet(url,function(responseText){		
			container.innerHTML = responseText;			
		}, onfailure);		
	}
	,
	
	/****** private methods ******/
	_getContext : function (args) {
		var context = document;
		if (args.length > 1)
		{
			context = args[1];
		}
		return context;
	}
	
};