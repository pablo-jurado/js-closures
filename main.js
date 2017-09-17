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

console.assert(addf(3)(4) === 7);

// write a function liftf that takes a binaty function
// and makes it callable with two invocations
// var addf = liftf(add);

function liftf (func) {
  return function (a) {
    return function (b) {
      return func(a, b);
    }
  }
}

var addfunc = liftf(add);
console.assert(addfunc(3)(4) === 7);
console.assert(liftf(mul)(5)(6) === 30);


// write a function curry that takes a binary function and an argument
// and returns a function that can take a second argument

function curry (func, a) {
  return function (b) {
    return func(a, b);
  }
}

// function curryES6 (func, ...a) {
//   return function (...b) {
//     return func(...a, ...b);
//   }
// }

var add3 = curry(add, 3);
console.assert(add3(4) === 7);
console.assert(curry(mul, 5)(6) === 30);

// without writing any new functions, show 3 ways to create the inc functions

var inc = curry(add, 1);
var inc2 = liftf(add)(1);
var inc3 = addf(1);

console.assert(inc(5) === 6);
console.assert(inc(inc(5)) === 7);
console.assert(inc2(5) === 6);
console.assert(inc3(5) === 6);
