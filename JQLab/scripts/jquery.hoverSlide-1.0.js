/*
 * hoverSlide（取不下好名字） - 跟随鼠标方向的滑动特效 - jQuery plugin
 * http://www.sxuek.com
 * Copyright(c) 2013 Bai-wenjiang（白文江）
 */
(function ( $ ) {
 
    $.fn.hoverSlide = function (options) {
		
		//默认设置
		var settings = $.extend({
			duration : 400,                  //效果持续时间，越小越快
			targetClass : "div.detail",      //目标class，即滑动目标的class
			bgColors : ['#CCC','#F00','#0F0','#00F'], //不同的背景色(数组)
		},options);
						
		return this.each(function(index) {	
			
			var _width = $(this).width();
			var _height = $(this).height();
			var _offsetLeft = $(this).offset().left;
			var _offsetTop = $(this).offset().top;
			var _animTarget = $(this).children(settings.targetClass);
			var _bgColor = settings.bgColors[index % settings.bgColors.length];
			var _left = 0;
			var _top = _height;
			var _direction = 0;
			
			_animTarget.css("position","absolute");
			_animTarget.css("display","block");
			_animTarget.css("left",_left);
			_animTarget.css("top", _top);
			_animTarget.css("background-color",_bgColor);
			$(this).css("overflow","hidden");
			$(this).css("position","relative");
			
			
			//计算并返回鼠标的移动方向
			var getHoverDir = function (e) {
				var x = (e.pageX - _offsetLeft - (_width / 2));
				x *= (_width > _height ? (_height / _width) : 1);
				var y = (e.pageY - _offsetTop - (_height / 2));
				y *= (_height > _width ? (_width / _height) : 1);
				return Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;	
			};
			
			//鼠标移入的事件处理函数
			var onMouseEnter = function (event) {
				_direction = getHoverDir(event);
				_left = 0;
				_top = - _height;
				switch (_direction) {
					case 0: //上入
						break;
					case 1: //右入
						_left = _width;
						_top = 0;
						break;
					case 2: //下入
						_left = 0;
						_top = _height;
						break
					case 3: //左入
						_left = -_width;
						_top = 0;
				}
				_animTarget.css('top',_top);
				_animTarget.css('left', _left);
				_animTarget.stop();
				_animTarget.show();
				_animTarget.animate({left:0, top:0}, settings.duration);
			};
			
			//鼠标移出的事件处理函数
			var onMouseLeave = function (event){
				_animTarget.fadeOut();		
			};
			
			//事件绑定
			$(this).hover(onMouseEnter,onMouseLeave);
		});
 
    };
 
}( jQuery ));