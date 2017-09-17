function add (a, b) {
  return a + b;
}

function sub (a, b) {
  return a - b;
}

function mul (a, b) {
  return a * b;
}

// write a function identityf that takes an argument
// and returns a function that returns that argument
// var three = identityf(3);
// three() --> 3

function identityf (input) {
  return function () {
    return input;
  }
}

var three = identityf(3);
console.log(three());
