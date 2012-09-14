function publishToWall() {
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

/* Firebase and Metrics */

/* Global Variable */
var g = {};
g.userInfo = {name: "WhoAmI", link: "www.facebook.com/me", like: "www.facebook.com/me/like"};
g.error = {errorType: "None"};

function localTimeStamp() {
      var dt = new Date(Date.now());	//TODO: Convert to UTC
      var hours = dt.getHours();
      var minutes = dt.getMinutes();
      var seconds = dt.getSeconds();

      // the above dt.get...() functions return a single digit
      // so I prepend the zero here when needed
      if (hours < 10) 
       hours = '0' + hours;

      if (minutes < 10) 
       minutes = '0' + minutes;

      if (seconds < 10) 
       seconds = '0' + seconds;

      return hours + ":" + minutes + ":" + seconds;
}

/* Pushes Global Information to Firebase */
function initFirebase() {
	// Init
	g.rootRef = new Firebase('http://gamma.firebase.com/ManavKataria/SandBox/JumbleFriend/');
	g.scoreListRef = g.rootRef.child('UserData');


	//Push incorporates a hashed timestamp as node name	
	g.myRef = g.scoreListRef.push({user: g.userInfo, score: -1, time: localTimeStamp(), error: g.error});
}

/* Pushes Global Information to Firebase */
// Precondition: g.myRef should be set via initFirebase() before a call to setFirebase() 
function setFirebase(){
	g.myRef.set({user: g.userInfo, score: count, time: localTimeStamp(), error: g.error});
}

function playerFBInfo() {
	FB.api("/me/",
		{fields : "name,link"},
		function(res){
			console.log(res);

			g.userInfo = {username: res.name, link: res.link, like: g.userInfo.like};

			/* Initial Push to Firebase */
			initFirebase();
	});
}	

/* TODO: Is it valid to have elements beginning with a digit? */
var lettersAsFriends = {
	"0" : [{
				name: "0",
				picture: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-snc4/41806_61124008229_1102100254_n.jpg"
			}],
	"1" : [{	
				name: "1",
				picture: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-snc4/373001_345986695424990_468649902_n.jpg"
			}],
	"2" : [{	
				name: "2",
				picture: "http://images3.wikia.nocookie.net/__cb20100803191119/lyricwiki/images/thumb/9/9f/Axxis_-_II.jpg/180px-Axxis_-_II.jpg"
			}],
	"3" : [{	
				name: "3",
				picture: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/373047_133091376821_159276893_n.jpg"
			}],
	"4" : [{	
				name: "4",
				picture: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-snc4/373569_222303587785460_1801097859_n.jpg"
			}],
	"5" : [{	
				name: "5",
				picture: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/50493_256579730979_5490084_n.jpg"
			}],
	"6" : [{	
				name: "6",
				picture: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/41592_379632647166_3293_n.jpg"
			}],
	"7" : [{	
				name: "7",
				picture: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-snc4/50262_370610944091_8246425_n.jpg"
			}],
	"8" : [{	
				name: "8",
				picture: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-snc4/50265_386320944032_3130258_n.jpg"
			}],
	"9" : [{	
				name: "9",
				picture: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/373241_187788471270897_778469928_n.jpg"
			}],
	" " : [{	
				name: "a blank space",
				picture: "http://profile.ak.fbcdn.net/hprofile-ak-ash3/41612_17610706465_2015402887_n.jpg"
			}],
	"a" : [{	
				name: "a",
				picture: ""
			}],
	"b" : [{	
				name: "b",
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
				picture: "http://i.c-b.co/is/image/LandOfNod/Pillow_ABC_E_LL_0412?$web_lineItem$"
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
				picture: "http://profile.ak.fbcdn.net/hprofile-ak-snc7/373035_118077678252869_1698485463_n.jpg"
			}],
	"j" : [{	
				name: "j",
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
	"y" : [{	
				name: "Yanni",
				picture: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/158054_136007876429612_1298155064_n.jpg"
			}],
	"z" : [{
				name: "Zorro",
				picture: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-snc4/187821_92323146014_6971422_n.jpg"
			}]
};

$(function() {
	
	function checkCorrectness(ans, inp) {
		var i;
		var ctr = 0;
		
		for (i=0; i<ans.length; i++) {
			if (ans[i] == inp[i]) {
				ctr++;
			}
		}
		
		$("#correct").html(ctr + "/" + ans.length + " tiles at correct position");

		if (ctr == ans.length) {
			//Puzzle Solved
			$("#sortable").addClass("complete");
			clearInterval(counter);
			alert('Hurray! You\'ve completed the puzzle! Try the next one, click Refresh Jumble');

			// Set score at Firebase
			setFirebase();

			//Disabling till product gets improvised.
			//sendRequestToRecipients(friend_ids.join(","));
		} else {
			$("#sortable").removeClass("complete");
		}
	}
	
	// Get a random like
	function getLike() {
		FB.api("/me/likes/", 
			function(res){
			
			var scrubbedArray = [];

			for (var x = 0; x < res.data.length; x++) {
				if (res.data[x].name.length <= 8 && /^[a-zA-Z0-9 ]*$/.test(res.data[x].name)) {
					scrubbedArray.push( res.data[x] );
				}
			}
			var randNum = Math.floor(Math.random() * scrubbedArray.length);
			var randLike = scrubbedArray[randNum].name;

			console.log(randLike);
			g.userInfo.like = randLike;

			JMBL.initJumble(randLike.toLowerCase());
		});
	}

	/* FIXME: Should be called only once per user session. Should not be *appended* for every game instance */
	JMBL.getFriends = function() {
		FB.api("/me/friends/",
			{fields : "name,id,picture"},
			function(res){

				for (var x = 0; x < res.data.length; x++) {
					var firstLetter = res.data[x].name.toLowerCase().substring(0,1);
					
					if (lettersAsFriends[firstLetter])
					  lettersAsFriends[firstLetter].push(res.data[x]);
				}
				getLike();
		});
		
		/* Query User Data From facebook */
		playerFBInfo();

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


    JMBL.initJumble = function (word) {
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

			friend = shuffle(lettersAsFriends[shuffled[x]])[0];

			//Sanity check
			if (friend.picture == "") {
				friend.picture = "http://www.springfield.net/market_images/thumb_not-available.gif"

				//Log Error in firebase.
				g.error[errorType] = "Thumb Not Available";
				//g.error[]
			}


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
			}
		});	

		currentArray = $("#sortable").sortable('toArray');
		// Check to see if word is complete
		checkCorrectness(word, currentArray.join(""));		

		//validating inputs 
		$("input.letter").bind("keyup", function () {
			inputchar = this.value.toLowerCase();
			
			if(inputchar != $(this).attr("data-letter")) {
				$(this).attr('style','color:red');
				//this.value = "";
			} else {
				$(this).parent().parent().removeClass("disabled");
				$(this).attr('style','color:green');				
			}
		});
		$("li img").bind("dblclick", function () {
			alert($(this).attr("data-hint"));
			timer(count - 5)
		});

		// Begin our timer
		timer();

	}

	function timer(newCount) {
		clearInterval(counter);

		if (newCount) {
			count = newCount;
		} else {
			count = 91;
		}

		counter=setInterval(timer, 1000); //1000 will  run it veery 1 second

		function timer() {
		  count = count - 1;
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