$(function() {

	function getLike() {
		// get the first like
		// todo: get a random like
		FB.api("me/likes",{
  			fields:'name',
  			limit:10
		},function(res){
			var randNum = Math.floor(Math.random() * (res.length + 1));
			var data = res[randNum];
			var randLike = data.name;
			return randLike;
		});
	}

	// Simple array shuffle function; feel free to update algorithm;
	function shuffle(array) {
		var newArray = array;
	    var tmp, current, top = newArray.length;

	    if(top) while(--top) {
	        current = Math.floor(Math.random() * (top + 1));
	        tmp = newArray[current];
	        newArray[current] = newArray[top];
	        newArray[top] = tmp;
	    }

    	return newArray;
	}


    window.initJumble = function () {
		// This is our word. This would be returned by our getLike() function or its equivalent;
		// For testing purposes it is currently hardcoded.
		//var word = getLike();
		console.log("Testing OpenGraph: my first like=" + getLike());
		var word = 'house';

		var currentArray = [];
		
		// We split the array into it's component letters and shuffle them.
		var charsArray = word.split('');
			shuffled = shuffle(charsArray);

		console.log("Original", charsArray)
		console.log("Shuffled", shuffled);


		var shuffledSnippet = '';
		for(var x = 0; x < shuffled.length; x++) {
			// Dirty. Build a text snippet of the HTML;
			shuffledSnippet += '<li class="ui-state-default" id="' + shuffled[x] + '">' + shuffled[x]+ '</li>'
		}

		// Inject the text snippet as the #sortable html
		$("#sortable").html(shuffledSnippet);



		$( "#sortable" ).sortable({
			stop: function(event, ui) { 
				currentArray = $("#sortable").sortable('toArray');

				console.log(currentArray);
				console.log(charsArray);

				// Check to see if current letter is in correct spot
				// checkLetterPositionCorrectness();

				// Check to see if word is complete
				// checkWordCompletion();
			}
		});


		$( "#sortable" ).disableSelection();

	}
});