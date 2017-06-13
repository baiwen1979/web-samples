// JavaScript Document

//从服务器Json解析而来的layout对象
var layoutObject = {
	selectedLayoutGrid: 'layout-grid-131', //用户最终选择（保存）的布局
	layoutPositions: {
		'layout-grid-1': {
			'column01': ['block01','block02','block03','block04','block05','block06',
						  'block07', 'block08','block09','block10','block11','block12']
		}, //单列自由布局
		
		'layout-grid-13':{
			'column01': ['block01','block02','block03','block04','block05','block06'],
			'column02': ['block07','block08','block09','block10','block11','block12']
		},//1:3两列布局
		
		'layout-grid-131': {
			'column01': ['block01','block02','block03','block04'],
			'column02': ['block05','block06','block07','block08'],
			'column03': ['block09','block10','block11','block12']
		} //1:3:1三列布局
	}
}

function performLayout(layoutGrid)
{
	$.each(layoutObject.layoutPositions[layoutGrid],function(key, value){
		$.each(layoutObject.layoutPositions[layoutGrid][key],function(index,value){
			$('#' + value).appendTo('#' + key);
	    })
	});
	$('#layoutContainer').removeClass();
	$('#layoutContainer').addClass("layout-grid clearfix " + layoutGrid);
}

function restoreLayout()
{
	performLayout(layoutObject.selectedLayoutGrid);
	$('input[layoutClass=' + layoutObject.selectedLayoutGrid+']').attr("checked","checked"); 
}

function saveLayout(){
	layoutObject.selectedLayoutGrid = $('input[type=radio]:checked').attr('layoutClass');
	$('.layout-sortable').each(function(index){
		layoutObject.layoutPositions[layoutObject.selectedLayoutGrid][this.id] = $(this).sortable('toArray');
	});
}

function changeLayout()
{
	performLayout($(this).attr('layoutClass'));
}

$(function(){
	   
    $('.layout-sortable').sortable({
		handler:'h3',
		helper:'clone',
		revert:true,
		tolerance:'pointer',
		connectWith:$('.layout-sortable'),
		opacity: 0.5,
		placeholder: 'highlight'
	}).disableSelection();
	
	$('#saveLayout').click(saveLayout);
	$('#restoreLayout').click(restoreLayout);
	$('input[type=radio]').click(changeLayout);
	
});