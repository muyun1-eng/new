// Get the button element
const button = document.querySelector('button');

// Add a click event listener to the button
button.addEventListener('click', function() {
  // Get the input array from the user
  const input = prompt('Enter an array of numbers, separated by commas:');

  // Parse the input into an array of numbers
  const arr = input.split(',').map(function(num) {
    return parseInt(num.trim());
  });

  // Sort the array using the parseArray() function
  const sortedArr = parseArray(arr);

  // Display the sorted array in a pop-up
  alert(sortedArr);
});

// Function that sorts an array of numbers in ascending order
function parseArray(arr) {
  return arr.slice().sort(function(a, b) {
    return a - b;
  });
}

