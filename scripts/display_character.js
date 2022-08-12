// Collects every entry in entry list into a list
var entry = document.getElementsByClassName("entry");

console.log(entry);

// Adds onhover listener to entries in entry list
for (let i = 0; i < entry.length; i++) {
	entry[i].addEventListener("mouseover", display_character);
}

var big_image = document.getElementsByClassName("big_image")[0]

// Displays matching character
function display_character() {

	var num = event.target.getAttribute("number");

	big_image.setAttribute("src", "images/" + num + ".png");
	console.log("images/" + num + ".png");

	var bi_width = big_image.naturalWidth;
	var bi_height = big_image.naturalHeight;

	big_image.setAttribute("width", bi_width/5);
	big_image.setAttribute("height", bi_height/5);

}