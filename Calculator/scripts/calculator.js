/*
 * Modal 
 * Constructor: Calculator 
 */

function Calculator()
{
	var exp = "0";
	
	this.input = function(op)
	{
		switch(op)
		{
			case "C": //clear all
				exp = "0";
				break;
			case "<": //delete a letter
				if (exp.length > 1)
				{
					exp = exp.substr(0, exp.length - 1);
				}
				else
				{
					exp = "0";
				}
				break;
			case "()": //input "(" or ")"
				console.log("Not Implemented!");
				break;
			case "+/-":
				exp = -eval(exp);
				exp = exp.toString();
				break;
			case "=":  //equal
				try
				{
					exp = exp.replace("¡Á", "*").replace("¡Â", "/");
					exp = eval(exp).toString();
				}
				catch(err)
				{
					exp = "ERROR";
				}
				break;
			default: //0~9
				if (exp == "0")
				{
					exp = op;
				}
				else
				{
					exp += op;
				}
		}
	}
	
	this.getOutput = function()
	{
		return exp;
	}
}

/*
 * Controller:
 * function object : init
 */
 
function init()
{
	var cal = new Calculator();
	
	Util.$("buttons").onclick = function (event){
	
		if (event.target.tagName != "A")
		{
			return;
		}
		
		var btnLabel = event.target.innerHTML;
		
		cal.input(btnLabel == "bk"? "<" : btnLabel);	
		Util.$("display").innerHTML = cal.getOutput();
	};
}

init();