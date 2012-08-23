$(function() {

	// Simple array shuffle function; feel free to update algorithm;
	function shuffle(array) {
	    var tmp, current, top = array.length;

	    if(top) while(--top) {
	        current = Math.floor(Math.random() * (top + 1));
	        tmp = array[current];
	        array[current] = array[top];
	        array[top] = tmp;
	    }

    	return array;
	}

	// This is our word. This would be returned by our getLike() function or its equivalent;
	// For testing purposes it is currently hardcoded.
	//var word = getLike();
	var word = 'house';
	
	// We split the array into it's component letters and shuffle them.
	var charsArray = word.split('');
	var shuffled = shuffle(charsArray);

	console.log(shuffled);


	var shuffledSnippet = '';
	for(var x = 0; x < shuffled.length; x++) {
		// Dirty. Build a text snippet of the HTML;
		shuffledSnippet += '<li class="ui-state-default">' + shuffled[x]+ '</li>'
	}

	// Inject the text snippet as the #sortable html
	$("#sortable").html(shuffledSnippet);



	$( "#sortable" ).sortable({
		stop: function(event, ui) { 

		}
	});


	$( "#sortable" ).disableSelection();


});