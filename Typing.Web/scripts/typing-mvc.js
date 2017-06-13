//Immediate Function
//(function() {

var APP = APP || {

	getModel : function () {
		
		//Private Static Variables
		//Single var pattern
		var chars = "",
		    curIndex = -1,
		    fingerKeyChars = [" ", "tgbrfv", "edc", "wsx", "qaz", " ", "yhnujm", "ik,", "ol.", "p;?\""],
		
		    //Private Static Methods
		    getCurrentFingerIndex = function () {
				if (curIndex >= chars.length) {
					return -1;
				}
				for (var i = 0; i < fingerKeyChars.length; i++) {
					if (fingerKeyChars[i].indexOf(chars[curIndex]) != -1) {
						return i;
					}
				}
			},
		
			//Event Object Constructor
			Event = function (curIndex, curChar) {
				this.curIndex = curIndex;
				this.curChar = curChar;
				this.curFingerIndex = getCurrentFingerIndex();
			},
		
			//Model
			model = {
			
				//Private Methods
				_notify: function () {
					if (this.onIndexChanged && typeof(this.onIndexChanged) == "function") {
						this.onIndexChanged(new Event(curIndex, chars[curIndex]));
					}
				},
				
				//Public Methods
				init : function (text) {
					chars = text;
				},
				
				next : function () {
					if (curIndex < chars.length) {
						curIndex++;
						this._notify();
						return chars[curIndex];
					}
					return null;
				},
							
				prev : function () {
					if (curIndex > 0) {
						curIndex--;
						this._notify();
						return chars[curIndex];
					}
					return null;
				}
			
			};
		
		return model;
	},
	
	getView : function () {
		
		var view = {
			
			update: function() {
			
			}			
		};
	},
    
	controller : {
		handleKeypress: function (e) {
			//event handling code
		},
		handleIndexChange: function () {
		}
	}
};

//}());
