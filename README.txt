Hey cool kids, this is a small MooTools class for paging through posts similar to FFFFOUND.

Options:

ar: 	   null		// An array of DOM elements, such as $$('.post') or $(document.body).getElements('.post')
populate:  null		// Your function that injects new posts into the DOM
keyEvent: 'keydown'	// The key action to listen to, 'keydown' or 'keyup' 
loop:	   false	// Whether to loop through the current DOM elements without polling for new ones.

Instantiation:
There are two different ways to run the class. One being to loop through current posts on the page and the second being to pass in a function that polls for new posts, like Twitter's "view more" bar.

<script type="text/javascript">

//Case 1: Looping
new JustKidding({
		ar: $(document.body).getElements('.post'),
		loop: true
		});

//Case 2: Populate function, like Twitter

function viewmore(){
	var el = new Element('div',{
		'class': 'post',
		'html': 'added'
	}).inject(document.body);
}

new JustKidding({
		ar: $(document.body).getElements('.post'),
		populate: viewmore
		});

</script>