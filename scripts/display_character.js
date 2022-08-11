// Collects every entry in entry list into a list
var entry = document.getElementsByClassName("entry");

// Adds onhover listener to entries in entry list
for (let i = 0; i < entry.length; i++) {
	entry[i].addEventListener("mouseover", display_character);
}

// Displays matching character
function display_character() {

	console.log(event.target.getAttribute("number"));

}