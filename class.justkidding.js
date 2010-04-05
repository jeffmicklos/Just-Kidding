var JustKidding = new Class({
	
	Implements: Options,
	
	options: {
		it: 0,
		ar: null,
		populate: null,
		keyEvent: 'keydown',
		loop: false
	},
	
	initialize: function(options){
		if(options.populate != null && options.loop == true){
			alert('either set a populate function or set looping, one or the other...');
			return false;
		}
		this.setOptions(options); 
		this.attachEvents();
	},
	
	attachEvents: function(){
		var that = this;
		new Keyboard({
		    defaultEventType: that.options.keyEvent, 
		    active: true,
		   	events: { 
		        j: that.toNext.bind(that), //I would love to know how to make this custom
		        k: that.toPrev.bind(that) //I tried dot notation for dynamic variables as well as... eval() =(
		    }
		});
		
	},
	
	toNext: function(){
		
		if(this.checkFocus){ //make sure that the user isn't focused on an input element
		
			if(this.options.ar[this.options.it] == null && this.options.loop == false){
			
				/*Case for adding elements*/
				if(this.options.populate != null){
					this.options.populate(); //user function to add more DOM elements
					this.reparse(); //reparse DOM tree
				} 
				else {
					return false;
				}
				
			}
			
			/*Case for looping*/
			if(this.options.ar[this.options.it] == null && this.options.loop == true) {
				new Fx.Scroll(window).toElement(this.options.ar[0]);
				this.options.it = 0;
			}
			
			new Fx.Scroll(window).toElement(this.options.ar[this.options.it]);
			this.options.it = this.options.it + 1;
		
		}
	},
	
	toPrev: function(){
		
		if(this.options.it != 1){ //?
			new Fx.Scroll(window).toElement(this.options.ar[this.options.it-2]);
			this.options.it = this.options.it - 1;
		}
	},
	
	reparse: function(){
		this.options.ar = $(document.body).getElements('.post');
	},
	
	checkFocus: function() {
		
		var curEl = document.activeElement.tagName;
		
		if(curEl == 'TEXTAREA' || curEl == 'INPUT'){
			return false;	
		} else {
			return true;
		}
		
		//if !document.activeElement, do FocusTracking a la:
		//http://stackoverflow.com/questions/497094/how-do-i-find-out-which-javascript-element-has-focus
	}
	
});