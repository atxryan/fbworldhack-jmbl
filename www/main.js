function checkCorrectness(ans, inp) {
	var i;
	var count = 0;
	
	for (i=0; i<ans.length; i++) {
		if (ans[i] == inp[i]) {
			count++;
		}
	}	
	$("#correct").html(count + "/" + ans.length + " are correct.");

	if (count == ans.length) {
		$("#sortable").addClass("complete");
	} else {
		$("#sortable").removeClass("complete");
	}
}


var lettersAsFriends = {
	"0" : [{picture: "http://www.macrobusiness.com.au/wp-content/uploads/2012/06/zero2.jpeg"}],
	"1" : [],
	"2" : [],
	"3" : [],
	"4" : [],
	"5" : [],
	"6" : [],
	"7" : [],
	"8" : [],
	"8" : [],
	"9" : [],
" " : [],
	"a" : [],
	"b" : [],
	"c" : [],
	"d" : [],
	"e" : [],
	"f" : [],
	"g" : [],
	"h" : [],
	"i" : [],
	"j" : [],
	"k" : [],
	"l" : [],
	"m" : [],
	"n" : [],
	"o" : [],
	"p" : [],
	"q" : [],
	"r" : [],
	"s" : [],
	"t" : [],
	"u" : [],
	"v" : [],
	"w" : [],
	"x" : [],
	"y" : [],
	"z" : [{picture: "http://www.macrobusiness.com.au/wp-content/uploads/2012/06/zero2.jpeg"}]
}

$(function() {

	window.getLike = function() {
		// get the first like
		// todo: get a random like
		FB.api("/me/likes/", 
			function(res){
			console.log("Likes response:", res.data);
			
			var scrubbedArray = [];

			for (var x = 0; x < res.data.length; x++) {
				if (res.data[x].name.length <= 8 && /^[a-zA-Z0-9]*$/.test(res.data[x].name)) {
					scrubbedArray.push( res.data[x] );
				}
			}
			var randNum = Math.floor(Math.random() * (scrubbedArray.length + 1));
			var randLike = scrubbedArray[randNum].name;

			console.log(randLike);
			initJumble(randLike);


			

			
		});
	}

	window.getFriends = function() {
		FB.api("/me/friends/",
			{fields : "name,id,picture"},
			function(res){

				console.log(res)

				for (var x = 0; x < res.data.length; x++) {
					var firstLetter = res.data[x].name.toLowerCase().substring(0,1);
					// console.log(lettersAsFriends[firstLetter]);
					
					if (lettersAsFriends[firstLetter])
					  lettersAsFriends[firstLetter].push(res.data[x]);

					//console.log(firstLetter, lettersAsFriends[firstLetter]);
				}

				window.getLike();
			
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


    window.initJumble = function (word) {
		// This is our word. This would be returned by our getLike() function or its equivalent;
		// For testing purposes it is currently hardcoded.
		

		//word = 'facebook';

		var currentArray = [];
		
		// We split the array into it's component letters and shuffle them.
		var charsArray = word.split('');
			shuffled = shuffle(charsArray);

		console.log("Original", charsArray)
		console.log("Shuffled", shuffled);


		var shuffledSnippet = '';
		for(var x = 0; x < shuffled.length; x++) {
			// Dirty. Build a text snippet of the HTML;
			console.log(shuffled[x].toLowerCase());
			shuffledSnippet += '<li class="ui-state-default" id="' + shuffled[x] + '">';
			shuffledSnippet += '<img src="' + lettersAsFriends[shuffled[x].toLowerCase()][0].picture + '" />'
			shuffledSnippet += '<span>' + shuffled[x] + '</span></li>';
		}

		// Inject the text snippet as the #sortable html
		$("#sortable").html(shuffledSnippet);



		$( "#sortable" ).sortable({
			stop: function(event, ui) { 
				currentArray = $("#sortable").sortable('toArray');

				// console.log(currentArray.join(""));
				// console.log(charsArray);

				// Check to see if current letter is in correct spot
				// checkLetterPositionCorrectness();

				// Check to see if word is complete
				checkCorrectness(word, currentArray.join(""));
			}
		});


		$( "#sortable" ).disableSelection();

		timer();

	}

	function timer() {
		var count=60;

		var counter=setInterval(timer, 1000); //1000 will  run it every 1 second

		function timer() {
		  count=count-1;
		  $("#timer b").text("00:" + count);

		  if (count == 5) {
		  	$("#timer").addClass("urgent");
		  }
		  
		  if (count <= 0) {
		     clearInterval(counter);
		     $( "#sortable" ).sortable('disable');


		     return;
		  }

		  //Do code for showing the number of seconds here
		}
	}
});