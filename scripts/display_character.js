// Retrieves JSON data, parses JSON data into object list, and
// creates entries in body of page
var entries;
var big_image;
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

	big_image = document.getElementsByClassName("big_image")[0];
}

// Displays matching character
function display_character() {

	var num = event.target.getAttribute("number");
	var old_image = big_image.getAttribute("src");
	var new_image = "images/" + num + ".png";
	if (old_image != new_image) {

		play_big_image_slide_in();
		big_image.setAttribute("src", "");
		big_image.setAttribute("src", "images/" + num + ".png");

		var bi_width = big_image.naturalWidth;
		var bi_height = big_image.naturalHeight;

		var new_height = Math.min(600, bi_height);
		var new_width = (bi_width*new_height) / bi_height;

		big_image.setAttribute("width", new_width);
		big_image.setAttribute("height", new_height);

	}
}

function play_big_image_slide_in() {
	document.getElementsByClassName("big_image")[0].className = "big_image";
	requestAnimationFrame((time) => {
		requestAnimationFrame((time) => {
			document.getElementsByClassName("big_image")[0].className = "big_image changing";
		});
	});
}
