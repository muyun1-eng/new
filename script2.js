function hideElement() {
  // Get the element by ID
  const element = document.getElementById("targetElement");
  
  // Use .style.display to hide the element
  element.style.display = "none";
}

// Add an event listener to the button
const button = document.getElementById("hideButton");
button.addEventListener("click", hideElement);
