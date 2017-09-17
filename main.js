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

// write a function addf that adds from two invocations
// addf(3)(4) --> 7

function addf (a) {
  return function (b) {
    return add(a, b)
  }
}

console.log(addf(3)(4));

// write a function liftf that takes a binaty function
// and makes it callable with two invocations
// var addf = liftf(add);
// addf(3)(4) --> 7
// liftf(mul)(5)(6) --> 30

function liftf (func) {
  return function (a) {
    return function (b) {
      return func(a, b);
    }
  }
}

var addfunc = liftf(add);
console.log(addfunc(3)(4));
console.log(liftf(mul)(5)(6));
