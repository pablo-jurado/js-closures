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

// without writing any new functions,
// show 3 ways to create the inc functions

var inc = curry(add, 1);
var inc2 = liftf(add)(1);
var inc3 = addf(1);

console.assert(inc(5) === 6);
console.assert(inc(inc(5)) === 7);
console.assert(inc2(5) === 6);
console.assert(inc3(5) === 6);

// write a function named twice that takes a binary function
// and return a unary function that passes its argument
// to the binary function twice

function twice (binary) {
  return function (a) {
    return binary(a, a);
  }
}

var doubl = twice(add);
var square = twice(mul);
console.assert(doubl(11) === add(11, 11));
console.assert(square(11) === 121);

// write revesrse, a function that reverses
// the arguments of a binary function

function reverse (binary) {
  return function (a, b) {
    return binary(b, a);
  }
}

// function reverseES6 (binary) {
//   return function (...args) {
//     return binary(...args.reverse());
//   }
// }

var bus = reverse(sub);
console.assert(bus(3, 2) === -1);

// write a function composeu that takes two unary functions
// and returns a unary functions that calls them both.

function composeu (func1, func2) {
  return function (a) {
    return func2(func1(a));
  }
}

console.assert(composeu(doubl, square)(5) === 100);

// write a function composeb that takes two binary funtions
// and returns a function that calls them both

function composeb (func1, func2) {
  return function (a, b, c) {
    return func2(func1(a, b), c);
  }
}

console.assert(composeb(add, mul)(2, 3, 7) === 35);

// write a limit function that allows a binary function
// to be called a limited number of times

function limit (func, limit) {
  var count = 0;
  return function (a, b) {
    if (count !== limit) {
      count += 1;
      return func(a, b);
    }
  }
}

var add_ltd = limit(add, 1);
console.assert(add_ltd(3, 4) === 7);
console.assert(add_ltd(3, 5) === undefined);
