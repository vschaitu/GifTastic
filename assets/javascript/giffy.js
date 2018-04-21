// Onload - Check for user input
//    If button clicked - Start or Restart the Quiz 
//    If Answer option Selected - Check the answer if correct & then go to next question etc.

window.onload = function () {

	$(document).on('click', '#addBtn', addCharacter);
	$(document).on('click', '.sellist', mainProcess);
	$(document).on('click', '.resitem', gifswitch);

	// used in Program
	var selectionArray = ["Trump"];
	var resulObj = [];
	var offset = 0;
	var prevSeletion = "";

	//Display Added Buttons
	function displayBtns() {
		$('.selectionCol button').remove();
		var varBtn;
		for (var i = 0; i < selectionArray.length; i++) {
			varBtn = $('<button type="button" class="btn btn-info mb-2 ml-2 sellist">');
			varBtn.text(selectionArray[i]);
			$('.selectionCol').append(varBtn);
		}
	}

	// Read the Input text and validate if its not spaces or null and then create button and append to DOM , if the input already exists - simply ignore
	function addCharacter() {
		var input = $('#inputText').val();
		$('#inputText').val("");
		newFunctiion("chaitu");
		if (input === "" || (/^\s*$/.test(input)) || input.length < 2) {
			alert("Enter valid text : Non spaces & minimum of 2 characters");
			return false;
		} else {
			if (selectionArray.indexOf(input) === -1) {
				selectionArray.push(input);
				displayBtns();
			}
		}
	};

	function newFunctiion(name) {
		console.log(name);
		console.log("Hi");
	};

	// When user Clicks the selected button
	//  Read the Selection Button text
	//  Preapare query API
	//  Call API endpoint using ajax
	//  Dynamically create DOM to display gif results , using API response

	function mainProcess() {
		var selText = $(this).text();
		// check if same button selected as previous, if so fetch next 20 gifs from API by setting offset
		if (selText === prevSeletion) {
			offset += 20;
		} else {
			prevSeletion = selText;
			offset = 0;
		}
		var queryURL = buildqueryURL(selText, offset);
		callGiphyAPI(queryURL);

	};

	function buildqueryURL(input, offset) {
		var apiKey = "8QU9AB0YiplJbck1GxBrDxoUE6l8AIoi";
		var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + input + "&limit=20&offset=" + offset + "&rating=PG-13&lang=en";
		console.log(queryURL);
		return queryURL;
	};

	function callGiphyAPI(queryURL) {
		$.ajax({
			url: queryURL,
			method: "GET",
		}).then(function (response) {
			fetchResponse(response);
			domUpdates();
		});
	};

	function fetchResponse(resp) {

		//var resp = result;
		var stillGif;
		var rating;
		var giffy;
		var imgWidth;
		var imgHeight;
		var gifStatus;
		var gifObj;


		for (var i = 0; i < resp.data.length; i++) {

			// Save gif , still image, height, widht & rating and add to array
			giffy = resp.data[i].images.original.url;
			stillGif = resp.data[i].images.original_still.url;
			imgWidth = resp.data[i].images.original_still.width;
			imgHeight = resp.data[i].images.original_still.height;
			rating = resp.data[i].rating;
			title = resp.data[i].title;
			gifObj = {
				"giffy": giffy,
				"stillGif": stillGif,
				"imgeHeigh": imgHeight,
				"imgeWidth": imgWidth,
				"gifStatus": "still",
				"rating": rating,
				"title": title
			};
			resulObj.push(gifObj)
		};
		console.log(resulObj);
	};

	// This function reads the array saved from API call and creates required HTML tages to display results	
	function gifswitch() {

	};


	// This function reads the array saved from API call and creates required HTML tages to display results	
	function domUpdates() {

		var i;
		var eImage;
		var eRating;
		var newDiv

		for (i = offset; i < resulObj.length ; i++) {
			var eRating = $('<h5 class="card-title">');
			eRating.html("Title: " + resulObj[i].title + '<br>' + "Rating: " + resulObj[i].rating);
			var eImage = $('<img class="card-img-top" src="' + resulObj[i].stillGif + '">');
			eImage.attr("item", i);
			var newDiv = $('<div class="resitem card ml-3 border-0">').append(eImage).append($('<div class="card-body pl-0 pt-0">').append(eRating));
			$('.serResuls').append(newDiv);
		}
	};

	// on start display buttons
	displayBtns();

};