window.onload = function() {

	var text = ";uabcdefg hijklmn opqrst uvwxyz abcdefg hijklmn opqrst uvwxyz ";
	text += text;
	var fingerKeys = [" ","tgbrfv","edc","wsx","qaz", " ","yhnujm", "ik,","ol.","p;?\""];	
	var currCharIndex = 0;
	
	var loadText = function(text, container, lineWidth) {
		var p = null;
		
		for (var i = 0; i < text.length; i++) {
		
			if (i % lineWidth == 0) {
				p = document.createElement("p");
				container.appendChild(p);
			}
			
			var span = document.createElement("span");
			span.innerHTML = text[i]==" "? "&nbsp;" : text[i];
			
			p.appendChild(span);
		}
	};
	
	var selectChar = function(currCharIndex, error) {
	
		var charSpans = Util.T$("span",Util.$("text"));
		
		for (var i = currCharIndex > 0 ? currCharIndex - 1: currCharIndex; 
			i <= currCharIndex + 1 && i < text.length; i++)
		{
			if (charSpans[i].className == "current")
			{
				charSpans[i].className = "";
			}
		}
		
		if (error)
		{
			charSpans[currCharIndex].className = "error";
		}
		else
		{
			charSpans[currCharIndex].className = "current";
		}
		
	};
	
	var selectKey = function(currCharIndex) {
		var keys = Util.C$("key",Util.$("keyboard"));
		
		for (var i = 0; i < keys.length; i++)
		{	if (keys[i].className.indexOf("current") != -1)
			{
				keys[i].className = keys[i].className.replace(" current", "");
			}
			
			var currChar = text[currCharIndex].toUpperCase();
			var keyChar = keys[i].innerHTML;
			
			if (keyChar == currChar || keyChar[0] == currChar || keyChar[5] == currChar)
			{
					keys[i].className += " current";
			}
		}
	};

	var selectFinger = function(currCharIndex) {
		var currChar = text[currCharIndex];
		
		var leftHand = Util.$("left-hand");
		var rightHand = Util.$("right-hand");
		
		leftHand.className = "";
		rightHand.className = "";
		
		for (var i = 0; i <fingerKeys.length; i++)
		{
			if (fingerKeys[i].indexOf(currChar) != -1)
			{	
				var hand = leftHand;
				if (Math.floor(i / 5) == 1 )
				{
					hand = rightHand;
				}
				hand.className="finger-" + (i % 5 + 1);
			}
		}
		
	};
	
	var updateView = function()
	{
		selectChar(currCharIndex);
		selectKey(currCharIndex);
		selectFinger(currCharIndex);
	};
	
	document.onkeypress = function(event) {
		var keyCode = event.keyCode || event.which || event.charCode;
		var keyChar = String.fromCharCode(keyCode);
		console.log(keyCode);
		if (text[currCharIndex] != keyChar)
		{
			selectChar(currCharIndex, true);
		}
		else
		{
			selectChar(currCharIndex);
		}
		if (currCharIndex < text.length - 1)
		{
			currCharIndex++;
		}
		updateView();	
	};
	
	document.onkeydown = function(event) {
		var keyCode = event.keyCode || event.which || event.charCode;
		console.log(keyCode);
		switch(keyCode)
		{
			case 8: //backspace
				if (currCharIndex > 0)
				{
					currCharIndex--;
				}
				break;
			case 13: //enter
			default:
		}
		updateView();
	};
	
	loadText(text, Util.$("text"), 49);	
	
	updateView();
		
}