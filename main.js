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
  };
}

var three = identityf(3);
console.log(three());

// write a function addf that adds from two invocations
// addf(3)(4) --> 7

function addf (a) {
  return function (b) {
    return add(a, b);
  };
}

console.assert(addf(3)(4) === 7);

// write a function liftf that takes a binaty function
// and makes it callable with two invocations
// var addf = liftf(add);

function liftf (func) {
  return function (a) {
    return function (b) {
      return func(a, b);
    };
  };
}

var addfunc = liftf(add);
console.assert(addfunc(3)(4) === 7);
console.assert(liftf(mul)(5)(6) === 30);

// write a function curry that takes a binary function and an argument
// and returns a function that can take a second argument

function curry (func, a) {
  return function (b) {
    return func(a, b);
  };
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
  };
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
  };
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
  };
}

console.assert(composeu(doubl, square)(5) === 100);

// write a function composeb that takes two binary funtions
// and returns a function that calls them both

function composeb (func1, func2) {
  return function (a, b, c) {
    return func2(func1(a, b), c);
  };
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
  };
}

var addLimited = limit(add, 1);
console.assert(addLimited(3, 4) === 7);
console.assert(addLimited(3, 5) === undefined);

// write a from function that produces a generator
// that will produce a series of values.

function from (index) {
  return function () {
    var first = index;
    index += 1;
    return first;
  };
}

var index = from(0);
console.assert(index() === 0);
console.assert(index() === 1);
console.assert(index() === 2);

// write a to function that takes a generator (from)
// and an end value and returns a generator
// that will produce numbers up to that limit

function to (func, end) {
  return function () {
    var value = func();
    if (value !== end) return value;
  };
}

var index1 = to(from(1), 3);
console.assert(index1() === 1);
console.assert(index1() === 2);
console.assert(index1() === undefined);

// write a fromTo function that produces a generator
// that will produce values in a range

function fromTo (a, b) {
  var value = to(from(a), b);
  return function () {
    return value();
  };
}

var index2 = fromTo(0, 3);

console.assert(index2() === 0);
console.assert(index2() === 1);
console.assert(index2() === 2);
console.assert(index2() === undefined);

// write an elemten function that takes an array and a generator
// and returns a generator that will peoduce elements from the array

function element (arr, func) {
  return function () {
    var index = func();
    if (index !== undefined) return arr[index];
  };
}

var abcArr = ['a', 'b', 'c', 'd'];
var ele = element(abcArr, fromTo(1, 3));
console.assert(ele() === 'b');
console.assert(ele() === 'c');
console.assert(ele() === undefined);

// modify the element function so that the generator
// argument is opcional. If a generator is not provided then
// each of the elements of the array will be produced

// my solution
// function element2 (arr, func) {
//   var numIndex = 0;
//   return function () {
//     if (func === undefined && numIndex !== arr.length) {
//       var value = arr[numIndex];
//       numIndex += 1;
//       return value;
//     }
//     if (func !== undefined) return arr[func()];
//   };
// }

// the functional way
function element2 (arr, func) {
  if (func === undefined) func = fromTo(0, arr.length);
  return function () {
    var index = func();
    if (index !== undefined) return arr[index];
  };
}

var ele2 = element2(abcArr);
console.assert(ele2() === 'a');
console.assert(ele2() === 'b');
console.assert(ele2() === 'c');
console.assert(ele2() === 'd');
console.assert(ele2() === undefined);

var ele3 = element(abcArr, fromTo(1, 3));
console.assert(ele3() === 'b');
console.assert(ele3() === 'c');
console.assert(ele3() === undefined);
