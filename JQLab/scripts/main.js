// JavaScript Document


$("#focus_ban").slide({ mainCell:".bd ul",autoPlay:true, delayTime:1000});

function nTab1(thisObj,Num){
	if(thisObj.className == "active")return;
	var tabObj = thisObj.parentNode.id;
	var tabList = document.getElementById(tabObj).getElementsByTagName("li");
	for(i=0; i <tabList.length; i++)
	{
		if (i == Num)
		{
		   thisObj.className = "active";
		   document.getElementById(tabObj+"_Content"+i).style.display = "block";
		}else{
		   tabList[i].className = "normal";
		   document.getElementById(tabObj+"_Content"+i).style.display = "none";
		}
	}
}

$("#course_box ul li").hoverSlide({targetClass:".show_hover"});

$("#teachers_box ul li").hoverSlide({targetClass:".show_hover"});

$("#works_box ul li").hoverSlide({targetClass:".show_hover"});

