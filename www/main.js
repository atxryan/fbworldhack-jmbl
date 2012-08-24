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
		clearInterval(counter);
		sendRequestToRecipients(friend_ids.join(","));
	} else {
		$("#sortable").removeClass("complete");
	}
}

function publishToWall(friendID) {
     FB.ui(
       {
         method: 'stream.publish',
         message: 'Message here.',
         attachment: {
           name: 'Play JumbleFriend',
           caption: 'Identify your friend\'s photos and unscramble one of your Likes.',
           description: (
             ''
           ),
           href: 'http://apps.facebook.com/jumblefriend/'
         },
         action_links: [
           { text: 'Play JumbleFriend', href: 'http://apps.facebook.com/jumblefriend/' }
         ],
         user_prompt_message: 'Personal message here'
       },
       function(response) {
         if (response && response.post_id) {
           // alert('Post was published.');
         } else {
           // alert('Post was not published.');
         }
       }
     );  
  }

var friend_ids = [];
var counter;

var count = 91;

var lettersAsFriends = {
	"0" : [ // Coke Zero
			{picture: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-snc4/41806_61124008229_1102100254_n.jpg"}],
	"1" : [{	
				name: "1",
				picture: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-snc4/373001_345986695424990_468649902_n.jpg"
			}],
	"2" : [{	
				name: "2",
				picture: ""
			}],
	"3" : [{	
				name: "3",
				picture: ""
			}],
	"4" : [{	
				name: "4",
				picture: ""
			}],
	"5" : [{	
				name: "5",
				picture: ""
			}],
	"6" : [{	
				name: "6",
				picture: ""
			}],
	"7" : [{	
				name: "7",
				picture: ""
			}],
	"8" : [{	
				name: "8",
				picture: ""
			}],
	"9" : [{	
				name: "9",
				picture: ""
			}],
	" " : [{	
				name: "a blank space",
				picture: ""
			}],
	"a" : [{	
				name: "a",
				picture: ""
			}],
	"b" : [{	
				name: "",
				picture: ""
			}],
	"c" : [{	
				name: "c",
				picture: ""
			}],
	"d" : [{	
				name: "d",
				picture: ""
			}],
	"e" : [{	
				name: "e",
				picture: ""
			}],
	"f" : [{	
				name: "f",
				picture: ""
			}],
	"g" : [{	
				name: "g",
				picture: ""
			}],
	"h" : [{	
				name: "h",
				picture: ""
			}],
	"i" : [{	
				name: "i",
				picture: ""
			}],
	"j" : [{	
				name: "",
				picture: ""
			}],
	"k" : [{	
				name: "k",
				picture: ""
			}],
	"l" : [{	
				name: "l",
				picture: ""
			}],
	"m" : [{	
				name: "m",
				picture: ""
			}],
	"n" : [{	
				name: "n",
				picture: ""
			}],
	"o" : [ 
			{	name: "Ocean Spray",
				picture: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/373019_117917151585263_710015587_n.jpg"
			}],
	"p" : [{	
				name: "p",
				picture: ""
			}],
	"q" : [{	
				name: "q",
				picture: ""
			}],
	"r" : [{	
				name: "r",
				picture: ""
			}],
	"s" : [{	
				name: "s",
				picture: ""
			}],
	"t" : [{	
				name: "t",
				picture: ""
			}],
	"u" : [{	
				name: "Usher",
				picture: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/592186_6564142497_957091799_n.jpg"
			}],
	"v" : [{	
				name: "v",
				picture: ""
			}],
	"w" : [{	
				name: "w",
				picture: ""
			}],
	"x" : [{	
				name: "X-men",
				picture: "https://fbexternal-a.akamaihd.net/safe_image.php?d=AQDpHmJOzORmI5Ma&w=180&h=540&url=http%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fen%2Fc%2Fc9%2FX-men-animated-series-intro.jpg&fallback=hub_tv&prefix=d"
			}],
	"y" : [ 
			{	name: "Yanni",
				picture: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/158054_136007876429612_1298155064_n.jpg"
			}],
	"z" : [{picture: "z"}]
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
				if (res.data[x].name.length <= 8 && /^[a-zA-Z0-9 ]*$/.test(res.data[x].name)) {
					scrubbedArray.push( res.data[x] );
				}
			}
			var randNum = Math.floor(Math.random() * (scrubbedArray.length + 1));
			var randLike = scrubbedArray[randNum].name;

			console.log(randLike);
			initJumble(randLike.toLowerCase());


			

			
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


		var shuffledSnippet = '';
		for(var x = 0; x < shuffled.length; x++) {
			// Dirty. Build a text snippet of the HTML;
			console.log(shuffled[x].toLowerCase());

			friend = shuffle(lettersAsFriends[shuffled[x]])[0];
			friend_ids.push(friend.id);
			shuffledSnippet += '<li class="ui-state-default disabled" id="' + shuffled[x] + '">';
			shuffledSnippet += '<img src="' + friend.picture + '" width="65" height="65" data-hint="' + friend.name + '"/>'
			shuffledSnippet += '<span><input type="text" class="letter" data-letter="' + shuffled[x] + '"/></span></li>';
		}

		// Inject the text snippet as the #sortable html
		$("#sortable").html(shuffledSnippet);



		$( "#sortable" ).sortable({
			cancel: ".disabled",

			stop: function(event, ui) { 
				currentArray = $("#sortable").sortable('toArray');
				// Check to see if word is complete
				checkCorrectness(word, currentArray.join(""));
			},

			handle: "li img"
		});


		$( "#sortable" ).disableSelection();

		timer();

		$("input.letter").bind("keyup", function () {
			if(this.value != $(this).attr("data-letter")) {
				this.value = "";
			} else {
				$(this).parent().parent().removeClass("disabled");
			}
		});
		$("li img").bind("dblclick", function () {
			alert($(this).attr("data-hint"));
			timer(count - 5)
		});

	}

	function timer(newCount) {

		
		clearInterval(counter);

		if (newCount) {
			count = newCount;
		} else {
			count = 91;
			$( "#sortable" ).sortable('enable');
		}

		counter=setInterval(timer, 1000); //1000 will  run it every 1 second

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

		}
	}
});