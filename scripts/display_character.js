// Retrieves JSON data, parses JSON data into object list, and
// creates entries in body of page
var entries;
var big_image;
var offscreen;
var curr_num;
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

function populate() {
	for (const entry in entries) {
		const new_entry = document.createElement("div");
		const character_data = entries[entry];
		new_entry.className = "entry";
		new_entry.textContent = character_data.name;
		new_entry.setAttribute("number", character_data.number);

		document.getElementsByClassName("entry_list")[0].appendChild(new_entry);
	}
	activate_interactive();
}

function activate_interactive() {
	// Collects every entry in entry list into a list
	var entry = document.getElementsByClassName("entry");

	// Adds onhover listener to entries in entry list
	for (let i = 0; i < entry.length; i++) {
		entry[i].addEventListener("mouseover", display_character);
		var temp_img = new Image();
		temp_img.src = "images/" + entry[i].number + ".png";
	}

	document.addEventListener("scroll", fade_big_image);

	big_image = document.getElementsByClassName("big_image")[0];
	offscreen = 1;
}

// Hides or shows big image when reaching a certain vertical point of the page
function fade_big_image() {
	var lastKnownScrollPosition = window.scrollY;

	if (lastKnownScrollPosition < 500 && offscreen == 0) {
		play_big_image_slide_out();
		offscreen = 1;
	} else if (lastKnownScrollPosition >= 500 && offscreen == 1) {
		play_big_image_slide_in();
		offscreen = 0;
	}
}

// Displays matching character
function display_character() {

	curr_num = event.target.getAttribute("number");
	var old_image = big_image.getAttribute("src");
	var new_image = "images/" + curr_num + ".png";
	if (old_image != new_image) {

		play_big_image_slide_in();
		big_image.setAttribute("src", "");
		big_image.setAttribute("src", "images/" + curr_num + ".png");

		var bi_width = big_image.naturalWidth;
		var bi_height = big_image.naturalHeight;

		var new_height = (new_width*bi_height)/bi_width;
		var new_width = 450;

		big_image.setAttribute("width", new_width);
		big_image.setAttribute("height", new_height);
	}
	offscreen = 0;
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