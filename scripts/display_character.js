// Retrieves JSON data, parses JSON data into object list, and
// creates entries in body of page
var entries;
var big_image;
var offscreen;
var curr_num;
var entry_text;
var text_top;
var text_bottom;
retrieve();

// Grabs JSON file with entries
async function retrieve() {
	const requestURL = "https://mnnguyen4.github.io/entry-series/data/characters.json";
	const request = new Request(requestURL);

	const response = await fetch(request);
	const characters_text = await response.text();
	entries = JSON.parse(characters_text);
	populate();
}

// Grabs text file with entry text
async function retrieveText(number) {
	const requestURL = "https://mnnguyen4.github.io/entry-series/text/" + number + ".txt";
	const request = new Request(requestURL);

	const response = await fetch(request);
	if (!response.ok) {
		throw new Error("Could not obtain text entry.");
	}
	const text = await response.text();
	return text;
}

function populate() {
	for (const entry in entries) {
		const new_entry = document.createElement("div");
		const character_data = entries[entry];
		new_entry.className = "entry";
		new_entry.textContent = character_data.name;
		new_entry.setAttribute("number", character_data.number);
		new_entry.setAttribute("font_color", character_data.font_color);
		new_entry.setAttribute("color_front", character_data.color_front);
		new_entry.setAttribute("color_back", character_data.color_back);

		document.getElementsByClassName("entry_list")[0].appendChild(new_entry);
	}
	entry_text = document.getElementsByClassName("entry_text")[0];
	activate_interactive();
}

function activate_interactive() {
	// Collects every entry in entry list into a list
	var entry = document.getElementsByClassName("entry");

	// Adds onhover listener to entries in entry list
	for (let i = 0; i < entry.length; i++) {
		entry[i].addEventListener("click", display_character);
		var temp_img = new Image();
		temp_img.src = "images/" + entry[i].number + ".png";
	}

	document.addEventListener("scroll", fade_big_image);
	document.getElementsByClassName("entry_text")[0].addEventListener("scroll", detectInfo);
	text_top = document.getElementsByClassName("entry_text_top")[0];
	text_bottom = document.getElementsByClassName("entry_text_bottom")[0];

	big_image = document.getElementsByClassName("big_image")[0];
	offscreen = 1;
}

// Hides or shows big image when reaching a certain vertical point of the page
function fade_big_image() {
	var lastKnownScrollPosition = window.scrollY;

	if (lastKnownScrollPosition < 200 && offscreen == 0) {
		play_big_image_slide_out();
		offscreen = 1;
	} else if (lastKnownScrollPosition >= 200 && offscreen == 1) {
		play_big_image_slide_in();
		offscreen = 0;
	}
}

// Displays above or below the entry text if there is available
// text to scroll to
function detectInfo() {
	scroll_pos = event.target.scrollTop;
	scroll_pos_from_bottom = event.target.scrollHeight - scroll_pos - 680;
	if (scroll_pos > 40) {
		text_top.textContent = "^^^  UP  ^^^";
	} else if (text_top.textContent = "^  UP  ^"){
		text_top.textContent = "";
	}

	if (scroll_pos_from_bottom > 20) {
		text_bottom.textContent = "vvv  DOWN  vvv";
	} else if (text_bottom.textContent = "vvv  DOWN  vvv"){
		text_bottom.textContent = "";
	}
}

// Displays matching character
function display_character() {

	var target = event.target;

	curr_num = target.getAttribute("number");
	var old_image = big_image.getAttribute("src");
	var new_image = "images/" + curr_num + ".png";
	if (old_image != new_image) {

		play_big_image_slide_in();
		big_image.setAttribute("src", "");
		big_image.setAttribute("src", new_image);
		big_image.onload = function() {

			var bi_width = big_image.naturalWidth;
			var bi_height = big_image.naturalHeight;
			var difference = bi_width - bi_height;

			var new_height = 0;
			var new_width = 0;
			// height is greater than width; extreme
			if (difference < -400) {
				new_height = 660;
				new_width = (new_height*bi_width)/bi_height;
			// height is greater than width
			} else if (difference < -200) {
				new_height = 600;
				new_width = (new_height*bi_width)/bi_height;
			// width is greater than height; extreme
			} else if (difference > 400) {
				new_width = 640;
				new_height = (new_width*bi_height)/bi_width;
			// width is greater than height
			} else if (difference > 200) {
				new_width = 610;
				new_height = (new_width*bi_height)/bi_width;
			// width and height are roughly the same
			} else {
				new_width = 540;
				new_height = (new_width*bi_height)/bi_width;
			}

			big_image.setAttribute("width", new_width);
			big_image.setAttribute("height", new_height);
		}
		offscreen = 0;
	}

	var previousActive = document.getElementsByClassName("entry active")[0];
	if (previousActive != null) {
		previousActive.className = "entry";
		previousActive.style.color = "#ffffff";
		previousActive.style.background = "#000000";
		previousActive.style.borderColor = "#000000";
		previousActive.style.boxShadow = "5px 5px 0px #000000";
	}
	target.className = "entry active";

	target.style.color = target.getAttribute("font_color");
	target.style.background = target.getAttribute("color_front");
	target.style.borderColor = target.getAttribute("color_front");
	target.style.boxShadow = "5px 5px 0px " + target.getAttribute("color_back");

	var subject_text = "#" + target.getAttribute("number") + " - " + target.textContent + "\n\n";
	var pad_text = retrieveText(target.getAttribute("number"));
	pad_text.then((response) => {
		entry_text.textContent = subject_text + response;
	})
	.catch((error_message) => {
		console.error(error_message);
		entry_text.textContent = subject_text;
	});

}

function play_big_image_slide_in() {
	big_image.className = "big_image";
	requestAnimationFrame((time) => {
		requestAnimationFrame((time) => {
			big_image.className = "big_image changing";
		});
	});
}

function play_big_image_slide_out() {
	big_image.className = "big_image";
	requestAnimationFrame((time) => {
		requestAnimationFrame((time) => {
			big_image.className = "big_image changing_out";
		});
	});
}