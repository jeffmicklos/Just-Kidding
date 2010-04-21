var JustKidding = new Class({
	
	Implements: Options,
	
	options: {
		it: 0,
		ar: null,
		populate: null,
		keyEvent: 'keydown',
		loop: false,
		key: null,
		selector: null
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
		this.options.key = new Keyboard({
		    defaultEventType: that.options.keyEvent, 
		    active: true,
		   	events: { 
		        j: that.toNext.bind(that), //I would love to know how to make this custom
		        k: that.toPrev.bind(that) //I tried dot notation for dynamic variables as well as... eval() =(
		    }
		});
		
	},
	
	toNext: function(){
		
		if(this.checkFocus()){ //make sure that the user isn't focused on an input element
			
			if(this.options.ar[this.options.it] == null && this.options.loop == false){ //we ran out of elements
			
				/*Case for adding elements*/
				if(this.options.populate != null){ //if there is a populate function defined
					this.options.key.deactivate();
					if(this.options.populate()){ //once we populate
						if(this.reparse()){
							new Fx.Scroll(window).toElement(this.options.ar[this.options.it]);
							this.options.it = this.options.it + 1;
							this.options.key.activate();
							return;
						}
						return;
					}
				} 
				else {
					return false;
				}
				return;
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
		
		if(this.checkFocus()){
			console.log(this.options.it);
			if(this.options.it != 1 && this.options.it != 0){ //?
				new Fx.Scroll(window).toElement(this.options.ar[this.options.it-2]);
				this.options.it = this.options.it - 1;
			}
			
		}
		
	},
	
	reparse: function(){
	
		this.options.ar = $(document.body).getElements(this.options.selector);
		return true;
		
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