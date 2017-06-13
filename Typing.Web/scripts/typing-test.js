APP.test = function () 
{
	console.log("---------- TEST BEGIN ----------");
	var m = this.getModel();
	m.init("abcdefg");
	m.onIndexChanged = function (event) { 
		console.log("[" + event.curIndex + "] = " + event.curChar + " fingerIndex:" + event.curFingerIndex); 
	};
	var c;
	while (m.next());
	while (m.prev());
	
	(function(who, when){
	    console.log("I met " + who + " on " + when);
	}("John", new Date()));
	
	(function(){
        var data = [1,2,3,4,5,6,7,8,9,10],
            i = 0,
			delay = 100;
            max = data.length;
        setTimeout(function(){
            if (i < max) {
                console.log(i++);
	        setTimeout(arguments.callee, delay);
            }
        }, delay);
    }());
	
	console.log("----------- TEST END -----------");
}

APP.test();