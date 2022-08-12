// Retrieves JSON data, parses JSON data into object list, and
// creates entries in body of page
var entries;
var big_image;
retrieve();

// Displays matching character
function display_character() {

	var num = event.target.getAttribute("number");

	big_image.setAttribute("src", "images/" + num + ".png");

	var bi_width = big_image.naturalWidth;
	var bi_height = big_image.naturalHeight;

	big_image.setAttribute("width", bi_width/5);
	big_image.setAttribute("height", bi_height/5);

}

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
		new_entry.number = character_data.number;

		document.body.appendChild(new_entry);
	}
	activate_interactive();
}

function activate_interactive() {
	// Collects every entry in entry list into a list
	var entry = document.getElementsByClassName("entry");

	// Adds onhover listener to entries in entry list
	for (let i = 0; i < entry.length; i++) {
		entry[i].addEventListener("mouseover", display_character);
	}

	big_image = document.getElementsByClassName("big_image")[0];
}