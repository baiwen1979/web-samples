var Util = {
	
	//public methods
	$: function(id) {		
		return this._getContext(arguments).getElementById(id);
	},
	
	T$: function(tagName) {
		return this._getContext(arguments).getElementsByTagName(tagName);
	},
	
	C$: function(className) {
		return this._getContext(arguments).getElementsByClassName(className);		
	},
	
	//private methods
	_getContext : function (args) {
		var context = document;
		if (args.length > 1)
		{
			context = args[1];
		}
		return context;
	}
};