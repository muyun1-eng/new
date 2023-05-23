// Function to ask for user information and display an alert
function getInfo() {
    var name = prompt('Enter your name:');
    var age = prompt('Enter your age:');
    
    alert('Hello ' + name + '! You are ' + age + ' years old.');
  }
  
  // Function to validate a 5-digit integer number
  function evalNumber() {
    var number = prompt('Enter a 5-digit number:');
    
    if (Number.isInteger(Number(number)) && number.length === 5) {
      alert('Valid 5-digit number: ' + number);
    } else {
      alert('Invalid input. Please enter a 5-digit integer number.');
    }
  }
  
  // Get the button element
  var infoButton = document.getElementById('infoButton');
  var numberButton = document.getElementById('numberButton');
  
  // Add event listeners to the buttons
  infoButton.addEventListener('click', getInfo);
  numberButton.addEventListener('click', evalNumber);
  