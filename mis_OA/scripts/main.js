// JavaScript Document
$(function(){
	//菜单折叠
	$('#menu li h3 a').click(function() {
		$(this).parent().parent().toggleClass('expanded');
		$(this).parent().next().slideToggle('show');
	});
	//为单击菜单添加选中样式，并显示相应内容的"正在加载"框
	$('#menu li ul li a').click(function() {
		$('#menu li ul li').removeClass('active');
		$(this).parent().addClass('active');
		$('#loading').show();
	});
	//为“首页”链接，显示“正在加载”框
	$('a#homeLink').click(function() {
	    $('#menu li ul li').removeClass('active');
		$('#loading').show();
	});
	//当iframe中的内容加载完毕后，隐藏"正在加载"框
	$('iframe#contentFrame').load(function(){		
		$('#loading').hide();
	});
	$(document).load(function(){
		$('#loading').hide();
	});
})