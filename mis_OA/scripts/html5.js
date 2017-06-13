// JavaScript Document
/* 本脚步可以使旧浏览器识别Html5标签*/
(function(){
	var aHtml5 = ['article','aside','audio','canvas','command','datagrid','datalist','datatemplate','details','dialog','eventsource','figure','figcaption','footer','header','mark','meter','nav','nest','output','progress','rule','section','source','time','vedio','hgroup','menu'];
    var iHtml5 = aHtml5.length;
    for(var i=0;i<iHtml5;i++){
		document.createElement(aHtml5[i]);
	}
})();