// JavaScript Document
$(function(){
	
	/*$(".draggable").draggable(
	  	{
		  	cursor:'move',
			handle:'h3',
			opacity:0.35,
			revert:'invalid'
		}
	);*/
	
	//$(".droppable").droppable();
	$("#leftSide").sortable(
	    {
			handle:'h3',
			helper:'clone',
			revert:true,
			tolerance:'intersect',
			connectWith:'#main,#rightSide',
			opacity: 0.6,
			placeholder:'highlight'
		}
	);
	$("#rightSide").sortable(
		{
			handle:'h3',
			helper:'clone',
			revert:true,
			tolerent:'fit',
			connectWith:'#main,#leftSide',
			opacity: 0.6,
			placeholder:'highlight'
		}
	);
	$("#main").sortable(
		{
			handle:'h3',
			helper:'clone',
	        revert:true,
			tolerance:'pointer',
			connectWith:'#leftSide,#rightSide',
			opacity: 0.6,
			placeholder:'highlight'
		}
	);
});