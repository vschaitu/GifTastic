// Onload - Check for user input
//    If button clicked - Start or Restart the Quiz 
//    If Answer option Selected - Check the answer if correct & then go to next question etc.

window.onload = function () {

	$(document).on('click', '#addBtn', addCharacter);
	$(document).on('click', '.sellist', mainProcess);

	// used in Program
	var selectionArray = ["Trump"];
	var resulObj = [];
	var offset = 0;
	var prevSeletion = "";

	var items = [
		{ name: 'Edward', value: 21 },
		{ name: 'Sharpe', value: 37 },
		{ name: 'And', value: 45 },
		{ name: 'The', value: -12 },
		{ name: 'Magnetic', value: 13 },
		{ name: 'Zeros', value: 37 }
	];



	// sort by value
	items.sort(function (a, b) {
		return a.value - b.value;
	});



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

	// Read the Input text and validate if its not spaces or null and then create button and append to DOM
	function addCharacter() {
		var input = $('#inputText').val();
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
			domUpdates(response);
		});
	};

	function domUpdates(resp) {

		//var resp = result;
		var stillGif;
		var rating;
		var giffy;
		var imgWidth;
		var imgHeight;
		var gifStatus;
		var gifObj;


		for (var i = 0; i < resp.data.length; i++) {

			giffy = resp.data[i].images.original.url;
			stillGif = resp.data[i].images.original_still.url;
			imgWidth = resp.data[i].images.original_still.width;
			imgHeight = resp.data[i].images.original_still.height;
			rating = resp.data[i].rating;
			gifObj = {
				"giffy": giffy,
				"stillGif": stillGif,
				"imgeHeigh": imgHeight,
				"imgeWidth": imgWidth,
				"gifStatus": "still",
				"rating": rating
			};
			resulObj.push(gifObj)
		};

		console.log(resulObj);
	};

	// on start display buttons
	displayBtns();

};