function hideElement() {
  var element = document.getElementById("targetElement");
  element.style.display = "none";
}

var button = document.getElementById("hideButton");
button.addEventListener("click", hideElement);
